---
icon: circle-info
cover: /assets/images/cover3.jpg
---

# 个人简介
<div style="display: flex; align-items: center;">
    <div style="flex: 1; text-align: left;">
        <h1>马璐瑶</h1>
        <p>2004.03 求职意向：软件开发实习生</p>
        <div>
            <span>
                15733435475
            </span>
            ·
            <span>
                mly798789@163.com
            </span>
            ·
            <span>
                <a href="#">https://mly66.github.io/blog/</a>
            </span>
            ·
            <span>
                <a href="https://github.com/mly66">mly66</a>
            </span>
        </div>
    </div>
    <div style="flex: 0;">
        <img src="https://free-img.mofashi.ltd/5/2025/03/17/67d7c20cd1292.png" alt="icon.png" title="icon.png" style="max-width: 150px; height: auto;">
    </div>
</div>

## 教育经历

- **本科**：河北石油职业技术大学 | 软件工程 | 2022.09~2026.07  
- 绩点：3.5/4.0（年级前5%）；奖学金：国家励志奖学金、校级一等奖学金；**数学建模竞赛省奖**（2024）
- 证书：华为鲲鹏应用开发工程师、软考程序员、英语四级、计算机二级；

## 工作经历

- **上海市深正科技  Java开发实习生 | 2025.06~2025.08**
  - 构建高性能搜索系统，采用 **Elasticsearch + MySQL** 组合方案，搜索响应速度提升 **50%+**，并通过 **Kafka 异步日志处理**降低核心链路耗时。
  - 优化系统性能，通过 **Redis 缓存 + 布隆过滤器** 降低数据库压力，热点接口 **QPS 提升 3 倍**；引入 **Redisson 分布式锁**保障高并发数据一致性。
  - 参与 APK 分析模块开发，基于 **Hutool + 自研解析工具**实现 APK 文件结构解析与签名信息提取，支持自动报告生成。
  - 实现任务调度与地理分析功能，基于 **Spring Scheduled** 开发案件日志定时清理与数据同步，并利用 **RedisGeoHash** 支持侦查对象地理位置标注与附近检索，提升情报分析效率。

- **长治市园中厦  Java开发实习生 | 2023.06~2023.08**
  - 开发房源生命周期管理模块，支持动态增删改查，图片信息通过 MinIO 存储，保障数据安全与访问效率。
  - 运用 **Redis（String、Hash、SortedSet）+ Caffeine** 缓存优化热门房源查询，接口响应时间由 300ms 降至 30ms。
  - 接入 **RabbitMQ** 实现订单提醒与支付流程异步解耦，设计死信队列处理超时订单，提升系统稳定性与用户体验。
  - 重构房源搜索模块，基于 **Elasticsearch** 实现拼音分词与同义词扩展，搜索准确率提升 40%，QPS 达 4000+。
  - 采用 **ShardingSphere** 对订单表进行水平分片（4库×8表），通过自定义散列策略解决数据倾斜问题，保障高并发下的数据一致性。

## 项目经历

- **伴君如梦**  
  *技术栈：SpringCloud、Nginx、Gateway、OpenFeign、Nacos、Elasticsearch、MongoDB、Minio、Seata*
  1. 登录校验：通过 Spring AOP + ThreadLocal 实现无侵入式鉴权，多服务用户信息透传，接口耗时降低 40%（25ms→15ms）。
  2. 缓存架构：采用布隆过滤器（误判率<0.1%）+**分布式锁+双缓存策略**，解决专辑详情页缓存穿透/击穿问题，QPS 提升至 1.2万，缓存失效延迟从 5s → 200ms。
  3. 性能优化：基于 **CompletableFuture** 实现多服务数据并行加载，接口响应时间从 800ms 优化至 220ms。
  4. 支付可靠性：通过 **Seata AT模式 + RabbitMQ 延迟队列**保障分布式事务，支付超时订单自动关闭，资损率下降 98%，订单状态同步延迟 <500ms。
  5. 创新设计：**MongoDB 分片**存储播放记录（Shard Key + TTL索引），支持亿级用户数据查询，性能较 MySQL 提升 8 倍。

- **记账大师**  
  *技术栈： LangChain4j + Embedding Store + PostgreSQL + pgvector + Redis + RabbitMQ + Axios*
  1. 完成系统框架搭建与数据库设计，采用 **PostgreSQL + pgvector** 管理账单、用户信息及对话上下文，利用事务、分表分区及向量存储能力，支持高效相似度检索与语义查询，保障数据一致性和高可用性。
  2. 基于 **LangChain4j** 构建智能记账引擎，采用 **RAG 技术向量化账单知识库**，实现自然语言账单解析与语义检索，AI 识别准确率 **90%+**。
  3. 实现流式响应机制，通过 **Spring WebFlux** 支持 AI 回答分段推送，前端实时呈现，模拟高并发对话场景。
  4. 引入 **Redis** 缓存层，存储用户会话和账单统计结果，动态设置 TTL（热点分类缓存 60 秒），启用持久化机制保障一致性。
  5. 搭建 **RabbitMQ 消息队列**，实现账单分析完成后的通知异步化，主链路响应时间由 **800ms 缩短至 200ms 内**，通知成功率 **99.5%**。

## 技能清单

- **语言与基础**：精通 **Java**，熟悉面向对象设计、集合框架、JUC 并发编程；深入理解 **JVM 内存模型**、类加载机制、垃圾回收与调优；掌握设计模式和编码规范。
- **数据库**：熟练 **MySQL** 优化与事务管理；具备 **Redis** 缓存实战经验，精通 **RDB/AOF、分布式锁、布隆过滤器、缓存一致性**解决方案；了解 **MongoDB** 存储及分片策略。
- **框架与微服务**：精通 **Spring Boot、Spring MVC、MyBatis/MyBatis-Plus**，熟悉 IoC/AOP/Bean 生命周期；具备 **Spring Cloud 微服务架构**实战经验，熟练使用 **Nacos、Gateway、OpenFeign、Sentinel、Seata**。
- **中间件与搜索**：熟练 **RabbitMQ** 消息队列，掌握消息确认、持久化及延迟队列机制；了解 **Kafka 流式处理**；熟悉 **Elasticsearch** 检索、聚合及集群部署；具备 **ELK 日志分析**经验。
- **缓存与高并发优化**：具备高并发系统设计经验，精通 **Redis + 布隆过滤器** 缓存体系及 **Lua 分布式锁**，可解决缓存穿透/击穿/雪崩问题。
- **前端与接口开发**：熟悉 **Vue.js、ElementUI、Axios**，理解 SPA 架构及前后端分离模式，能独立完成接口设计与联调。
- **DevOps 与部署**：熟悉 **Linux** 常用操作，掌握 **Docker 容器化部署**与 **Nginx** 配置，了解 **Jenkins CI/CD** 流程，具备独立部署与性能优化能力。



## **个人评价**

- **技术驱动力强**：具备扎实后端开发能力，善于学习和应用新技术，能结合 **Cursor、Gemini 等 AI 工具**实现代码自动化与逻辑优化。
- **责任心与执行力高**：工作主动、思维严谨，能高效解决问题，快速融入团队，适应加班和出差，并持续提升技术水平。
- **良好的沟通协作**：具备优秀团队协作与跨部门沟通能力，高压环境下能保证项目有序推进与高质量交付。