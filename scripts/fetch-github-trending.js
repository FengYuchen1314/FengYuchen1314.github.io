const fs = require('fs');
const path = require('path');
const { generateProjectIntroduction } = require('./deepseek-generator');

async function fetchTrendingRepositories() {
    const url = 'https://api.github.com/search/repositories?q=created:>=' + getDateYesterday() + '&sort=stars&order=desc&per_page=10';
    console.log('Fetching trending repositories from:', url);
    
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Hexo-GitHub-Trending-Bot'
            }
        });
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`Found ${data.items.length} repositories`);
        return data.items.slice(0, 2);
    } catch (error) {
        console.error('Error fetching trending repositories:', error);
        return [];
    }
}

function getDateYesterday() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
}

async function generatePostContent(repo, index) {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    const title = `GitHub明星项目推荐 ${index + 1}: ${repo.full_name}`;
    
    console.log(`正在为 ${repo.full_name} 生成AI项目介绍...`);
    let aiIntroduction = '';
    try {
        aiIntroduction = await generateProjectIntroduction(repo);
        console.log(`✅ ${repo.full_name} 的AI介绍生成成功`);
    } catch (error) {
        console.error(`❌ ${repo.full_name} 的AI介绍生成失败:`, error.message);
        // 使用备用介绍
        aiIntroduction = `## 项目概述

${repo.full_name} 是一个在GitHub上获得${repo.stargazers_count}个星标的热门开源项目。

## 项目简介

${repo.description || '该项目暂无详细描述。'}

*注：AI服务暂时不可用，此处为自动生成的基础介绍。*`;
    }
    
    return `---
title: "${title}"
date: ${formattedDate} 12:00:00
tags: [GitHub, 开源, 推荐]
categories: 项目推荐
---

# ${repo.full_name}

${repo.description || '暂无描述'}

## 项目信息

- **仓库**: [${repo.full_name}](${repo.html_url})
- **星标数**: ${repo.stargazers_count}
- **派生数**: ${repo.forks_count}
- **语言**: ${repo.language || '未指定'}
- **创建时间**: ${new Date(repo.created_at).toLocaleDateString('zh-CN')}
- **最近更新**: ${new Date(repo.updated_at).toLocaleDateString('zh-CN')}

## 📊 详细项目分析

${aiIntroduction}

## 🎯 为什么推荐该项目？

该项目在GitHub上获得了大量关注（${repo.stargazers_count}个星标），最近一天内新增星标数显著，值得关注和学习。

### 主要亮点：
1. **社区认可度高**：${repo.stargazers_count}个星标证明项目质量
2. **技术栈现代化**：${repo.language ? `使用${repo.language}开发` : '采用先进技术架构'}
3. **活跃维护**：最近更新于${new Date(repo.updated_at).toLocaleDateString('zh-CN')}
4. **实用性强**：${repo.forks_count}个派生说明项目具有实际应用价值

## 🚀 快速开始

\`\`\`bash
git clone ${repo.clone_url}
cd ${repo.full_name.split('/')[1]}
\`\`\`

### 建议步骤：
1. 阅读项目的README文档了解基本用法
2. 查看examples目录或demo项目
3. 参考项目文档进行配置和部署
4. 参与社区讨论和贡献

## 🔗 相关链接

- [GitHub仓库](${repo.html_url})
- [Issues](${repo.html_url}/issues)
- [Pull Requests](${repo.html_url}/pulls)
- [Actions](${repo.html_url}/actions) (如果有CI/CD)
- [Projects](${repo.html_url}/projects) (如果有项目管理)

---
*本文由DeepSeek AI辅助生成，每日自动更新GitHub明星项目推荐*`;
}

async function main() {
    console.log('Starting GitHub trending fetch script...');
    
    const repos = await fetchTrendingRepositories();
    
    if (repos.length === 0) {
        console.log('No repositories found, skipping post generation');
        return;
    }
    
    console.log(`Generating ${repos.length} posts...`);
    
    const postsDir = path.join(__dirname, '../source/_posts');
    if (!fs.existsSync(postsDir)) {
        fs.mkdirSync(postsDir, { recursive: true });
    }
    
    for (let i = 0; i < repos.length; i++) {
        const repo = repos[i];
        console.log(`处理项目 ${i + 1}/${repos.length}: ${repo.full_name}`);
        
        try {
            const postContent = await generatePostContent(repo, i);
            const filename = `github-trending-${new Date().toISOString().split('T')[0]}-${i + 1}.md`;
            const filepath = path.join(postsDir, filename);
            
            fs.writeFileSync(filepath, postContent, 'utf8');
            console.log(`✅ 生成文章: ${filename}`);
            
            // 在项目之间添加延迟，避免API速率限制
            if (i < repos.length - 1) {
                console.log('等待1秒继续下一个项目...');
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } catch (error) {
            console.error(`❌ 处理项目 ${repo.full_name} 失败:`, error.message);
            // 继续处理下一个项目
            continue;
        }
    }
    
    console.log('Script completed successfully');
}

if (require.main === module) {
    main().catch(error => {
        console.error('Script failed:', error);
        process.exit(1);
    });
}

module.exports = { fetchTrendingRepositories, generatePostContent };