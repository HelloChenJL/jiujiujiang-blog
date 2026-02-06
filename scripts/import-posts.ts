import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { generateText } from '@xsai/generate-text';

// ---------------- 配置项 ----------------
const DINGTALK_EXPORT_DIR = 'C:/Users/chen/Desktop/blog'; // ⚠️ 请替换为你实际的钉钉导出目录
const POSTS_DIR = 'source/posts'; // 博客文章目录
const ASSETS_DIR = 'source/img/dingtalk'; // 图片资源存放目录
const ASSETS_PUBLIC_PATH = '/img/dingtalk'; // 图片在 Markdown 中的引用路径前缀
// ----------------------------------------

// 确保目录存在
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// 辅助函数：处理文件名（去除非法字符）
function sanitizeFileName(name: string): string {
  return name.replace(/[\\/:*?"<>|]/g, '_').trim();
}

// 辅助函数：复制图片并返回新的路径
function processImage(imagePath: string, fileName: string): string {
  if (!fs.existsSync(imagePath)) return '';

  const ext = path.extname(imagePath);
  const newFileName = `${fileName}_${Date.now()}${ext}`; // 防止重名
  const targetPath = path.join(ASSETS_DIR, newFileName);

  fs.copyFileSync(imagePath, targetPath);
  return path.join(ASSETS_PUBLIC_PATH, newFileName).replace(/\\/g, '/');
}

// AI 标签生成函数 (模拟，实际需要接入 API)
// 由于 @xsai/generate-text 需要模型配置，这里我们做一个简单的基于内容的关键词提取作为替代
// 或者你可以配置一个真实的 AI 模型接口
function generateTagsFromContent(content: string): string[] {
  const commonTags = [
    'React', 'Vue', 'Angular', 'Node.js', 'JavaScript', 'TypeScript', 'CSS', 'HTML',
    'Rust', 'Go', 'Python', 'Java', 'Docker', 'Kubernetes', 'Linux', 'Windows',
    'Git', 'GitHub', 'CI/CD', '算法', '数据结构', '面试', '生活', '随笔', '工具',
    '效率', '配置', '教程', '指南', 'Bug', '报错', '解决方案'
  ];
  
  const tags: string[] = [];
  const lowerContent = content.toLowerCase();
  
  commonTags.forEach(tag => {
    if (lowerContent.includes(tag.toLowerCase())) {
      tags.push(tag);
    }
  });

  // 如果没有匹配到常用标签，给一个默认标签
  if (tags.length === 0) {
    tags.push('未分类');
  }

  return tags.slice(0, 5); // 最多返回 5 个标签
}

// 主逻辑：递归遍历并转换
async function processDirectory(dir: string, parentCategory: string | null = null) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ 目录不存在: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 如果是目录，目录名即为分类名
      // 如果有父分类，则构建层级分类，例如 ["技术", "前端"]
      // 这里简化处理，直接用当前目录名作为主分类，或者你可以传递数组来构建多级分类
      const currentCategory = file; 
      
      // 递归处理子目录
      await processDirectory(fullPath, currentCategory);
    } else if (file.endsWith('.md')) {
      console.log(`正在处理: ${file}`);
      
      const content = fs.readFileSync(fullPath, 'utf-8');
      const fileNameWithoutExt = path.basename(file, '.md');
      const safeTitle = sanitizeFileName(fileNameWithoutExt);

      // 解析 Frontmatter（如果有的话，钉钉导出通常没有，但我们加上以防万一）
      const { content: mdContent } = matter(content);

      // 移除 Attachments 部分（钉钉导出可能包含无法访问的附件链接）
      const attachmentIndex = mdContent.indexOf('## Attachments:');
      let processingContent = mdContent;
      if (attachmentIndex !== -1) {
        processingContent = mdContent.substring(0, attachmentIndex);
      }

      // 移除 "原confluence文档链接" 及其后面的内容
      // 这里的匹配逻辑比较宽泛，只要包含这个关键词行，就移除该行及之后的内容（或者只移除该行）
      // 用户描述是“这些内容也都去掉”，通常指这个链接行。如果它在底部，可能也想去掉它之后的内容。
      // 我们先尝试移除包含该关键词的行。
      processingContent = processingContent.replace(/.*原confluence文档链接.*/gi, '');
      
      // 如果需要更激进地移除该行之后的所有内容（假设它也在底部），可以使用：
      // const confluenceIndex = processingContent.indexOf('原confluence文档链接');
      // if (confluenceIndex !== -1) {
      //   processingContent = processingContent.substring(0, confluenceIndex);
      // }
      // 但根据通常习惯，这种链接可能只是最后一行，或者中间某处。如果是中间，截断会丢失内容。
      // 鉴于用户刚才说“在文档的底部的## Attachments:下面的内容都删掉”，这次可能是类似的底部链接。
      // 为了安全起见，我们先只替换掉这一行。如果不干净，再调整。

      // 处理 Markdown 内容中的本地图片引用
      let newContent = processingContent.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, imgPath) => {
        // 如果是网络图片，跳过
        if (imgPath.startsWith('http')) return match;

        // 构建图片的完整路径（假设图片在同级目录或特定资源目录下）
        const absImgPath = path.resolve(path.dirname(fullPath), imgPath);
        
        if (fs.existsSync(absImgPath)) {
          const newSrc = processImage(absImgPath, safeTitle);
          return `![${alt}](${newSrc})`;
        } else {
          // 尝试在同名 assets 文件夹下查找（有些导出工具会这样放）
          const assetsPath = path.join(path.dirname(fullPath), 'assets', path.basename(imgPath));
           if (fs.existsSync(assetsPath)) {
             const newSrc = processImage(assetsPath, safeTitle);
             return `![${alt}](${newSrc})`;
           }
          
          console.warn(`⚠️ 图片未找到: ${absImgPath}`);
          return match;
        }
      });

      // 自动生成标签
      const tags = generateTagsFromContent(newContent);

      // 构建新的 Frontmatter
      const frontmatter = {
        title: fileNameWithoutExt,
        date: stat.birthtime, // 使用文件创建时间
        categories: parentCategory ? [parentCategory] : ['默认分类'], // 使用父目录名作为分类
        tags: tags,
      };

      // 生成新的 Markdown 文件内容
      const finalContent = matter.stringify(newContent, frontmatter);
      
      // 写入到 source/posts
      // 为了保持分类结构清晰，我们可以选择将文件直接放在 posts 根目录，
      // 或者在 posts 下也创建对应分类文件夹。Astro 的 content collections 通常扁平存放即可，
      // 因为分类是通过 frontmatter 指定的。
      const targetPath = path.join(POSTS_DIR, `${safeTitle}.md`);
      fs.writeFileSync(targetPath, finalContent);
      console.log(`✅ 已导入: ${targetPath} (分类: ${frontmatter.categories}, 标签: ${frontmatter.tags})`);
    }
  }
}

// 运行脚本
console.log('🚀 开始从钉钉导入文档...');
// 初始调用时，不传递 parentCategory，第一层目录将成为分类
processDirectory(DINGTALK_EXPORT_DIR).then(() => {
  console.log('🎉 导入完成！');
});
