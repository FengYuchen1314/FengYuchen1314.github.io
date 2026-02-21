const https = require('https');

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-8f0bb8d1265b4c50911bb3d095b697d8';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';  // 非思考模型，根据用户要求

async function generateProjectIntroduction(repo) {
    const {
        full_name,
        description = '暂无描述',
        html_url,
        stargazers_count,
        forks_count,
        language,
        updated_at,
        created_at
    } = repo;

    const prompt = `你是一个技术博客作者，需要为GitHub上的开源项目撰写详细的项目介绍。请基于以下项目信息，生成一篇详细、专业、有吸引力的中文项目介绍：

项目名称：${full_name}
项目描述：${description || '暂无描述'}
项目URL：${html_url}
星标数：${stargazers_count}
派生数：${forks_count}
主要语言：${language || '未指定'}
创建时间：${created_at}
最近更新：${updated_at}

请生成一篇详细的项目介绍，包含以下内容：
1. 项目概述：简要介绍项目的核心功能和定位
2. 技术特点：分析项目的技术栈、架构特点和创新点
3. 应用场景：说明项目的适用场景和解决的实际问题
4. 项目优势：与类似项目相比的优势和特色
5. 学习价值：对开发者有哪些学习和参考价值
6. 使用建议：如何开始使用这个项目，有哪些注意事项

要求：
- 使用专业但易懂的中文写作
- 内容详实，不少于300字
- 格式清晰，使用适当的Markdown格式（如标题、列表等）
- 保持客观中立，不夸大其词
- 避免重复项目描述中已有的基本信息

请直接返回项目介绍内容，不需要额外的说明或问候语。`;

    try {
        const response = await makeDeepSeekRequest(prompt);
        return response;
    } catch (error) {
        console.error('DeepSeek API请求失败:', error.message);
        // 返回一个备用介绍
        return generateFallbackIntroduction(repo);
    }
}

function makeDeepSeekRequest(prompt) {
    return new Promise((resolve, reject) => {
        const requestData = JSON.stringify({
            model: DEEPSEEK_MODEL,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 2000,
            temperature: 0.7,
            stream: false
        });

        const options = {
            hostname: 'api.deepseek.com',
            port: 443,
            path: '/v1/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                'Content-Length': Buffer.byteLength(requestData)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    
                    if (parsedData.error) {
                        reject(new Error(`DeepSeek API错误: ${parsedData.error.message}`));
                        return;
                    }

                    if (!parsedData.choices || !parsedData.choices[0]) {
                        reject(new Error('DeepSeek API返回格式异常'));
                        return;
                    }

                    const content = parsedData.choices[0].message.content;
                    resolve(content);
                } catch (parseError) {
                    reject(new Error(`解析DeepSeek API响应失败: ${parseError.message}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error(`DeepSeek API请求失败: ${error.message}`));
        });

        req.write(requestData);
        req.end();
    });
}

function generateFallbackIntroduction(repo) {
    const {
        full_name,
        description = '暂无描述',
        language,
        stargazers_count
    } = repo;

    return `## 项目概述

${full_name} 是一个在GitHub上获得${stargazers_count}个星标的热门开源项目。

## 技术特点

${language ? `该项目主要使用${language}语言开发。` : '项目使用多种技术栈开发。'}

## 应用场景

该项目可以应用于多种场景，具体取决于项目的功能特性。

## 项目优势

- 开源免费，社区活跃
- 代码质量较高，获得较多开发者关注
- ${language ? `使用现代化的${language}技术栈` : '采用先进的技术架构'}

## 学习价值

通过研究该项目，开发者可以学习到：
1. 开源项目的架构设计
2. ${language ? `${language}编程的最佳实践` : '现代软件开发实践'}
3. 项目管理和协作经验

## 使用建议

建议先阅读项目的README文档，了解基本使用方法和注意事项。

*注：由于AI服务暂时不可用，此处为自动生成的基础介绍。*`;
}

module.exports = {
    generateProjectIntroduction,
    DEEPSEEK_API_KEY,
    DEEPSEEK_MODEL
};