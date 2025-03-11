"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[8855],{6262:(t,o)=>{o.A=(t,o)=>{const n=t.__vccOpts||t;for(const[t,e]of o)n[t]=e;return n}},4392:(t,o,n)=>{n.r(o),n.d(o,{comp:()=>s,data:()=>d});var e=n(641);const r={},s=(0,n(6262).A)(r,[["render",function(t,o){return(0,e.uX)(),(0,e.CE)("div",null,o[0]||(o[0]=[(0,e.Fv)('<h1 id="jwt" tabindex="-1"><a class="header-anchor" href="#jwt"><span>JWT</span></a></h1><h2 id="cookie、session、token、jwt-面试八股文-🔥" tabindex="-1"><a class="header-anchor" href="#cookie、session、token、jwt-面试八股文-🔥"><span><strong>Cookie、Session、Token、JWT 面试八股文 🔥</strong></span></a></h2><hr><h3 id="_1️⃣-认证-authentication-vs-授权-authorization-🔑" tabindex="-1"><a class="header-anchor" href="#_1️⃣-认证-authentication-vs-授权-authorization-🔑"><span><strong>1️⃣ 认证（Authentication） vs 授权（Authorization）🔑</strong></span></a></h3><p>✅ <strong>认证</strong>（身份验证）：确认 <strong>“你是你自己”</strong>（登录、指纹识别）。 ✅ <strong>授权</strong>（访问权限）：确认 <strong>“你能访问什么”</strong>（应用权限、OAuth 授权）。 ✅ <strong>凭证</strong>（Credentials）：证明身份的媒介，如 <strong>Cookie、Session、Token、JWT</strong>。</p><hr><h3 id="_2️⃣-什么是-cookie-🍪" tabindex="-1"><a class="header-anchor" href="#_2️⃣-什么是-cookie-🍪"><span><strong>2️⃣ 什么是 Cookie？🍪</strong></span></a></h3><p>✅ <strong>定义</strong>：存储在客户端的 <strong>小型数据文件</strong>，用于 <strong>记录用户身份</strong>。 ✅ <strong>特点</strong>：</p><ul><li><p><strong>存储位置</strong>：浏览器端（<code>document.cookie</code>）。</p></li><li><p><strong>大小限制</strong>：单个 <code>cookie</code> <strong>不超过 4KB</strong>，单域最多存 <strong>300 个 cookie</strong>。</p></li><li><p>作用域</p><ul><li><strong>不可跨域</strong>（<code>domain</code> 绑定单一域名）。</li><li><strong>一级 &amp; 二级域名可共享</strong>（<code>domain=.example.com</code>）。</li></ul></li><li><p>生命周期</p><ul><li><strong>会话 Cookie</strong>（<code>Session Cookie</code>）：浏览器关闭后消失。</li><li><strong>持久化 Cookie</strong>（<code>Persistent Cookie</code>）：可设置 <code>expires</code>/<code>max-age</code>。</li></ul></li></ul><p>✅ <strong>常见属性</strong>：</p><table><thead><tr><th><strong>属性</strong></th><th><strong>作用</strong></th></tr></thead><tbody><tr><td><code>expires</code></td><td>过期时间（UTC 时间）</td></tr><tr><td><code>max-age</code></td><td>多少秒后过期</td></tr><tr><td><code>domain</code></td><td>允许访问的域</td></tr><tr><td><code>path</code></td><td>允许访问的路径</td></tr><tr><td><code>secure</code></td><td>仅 HTTPS 传输</td></tr><tr><td><code>httpOnly</code></td><td>防止 JS 读取（防 XSS 攻击）</td></tr><tr><td><code>SameSite</code></td><td>防止跨站请求伪造（CSRF）</td></tr></tbody></table><p>✅ <strong>安全性</strong>： ❌ <strong>容易被劫持 &amp; 窃取</strong>，应 <strong>配合 <code>httpOnly</code> &amp; <code>Secure</code> 保护</strong>。</p><hr><h3 id="_3️⃣-什么是-session-📦" tabindex="-1"><a class="header-anchor" href="#_3️⃣-什么是-session-📦"><span><strong>3️⃣ 什么是 Session？📦</strong></span></a></h3><p>✅ <strong>定义</strong>：<strong>存储在服务器端</strong>的会话数据，<strong>客户端只存 <code>sessionID</code></strong>。 ✅ <strong>认证流程</strong>： 1️⃣ 用户登录，<strong>服务器生成 <code>sessionID</code></strong>。 2️⃣ <code>sessionID</code> 存入 <strong>浏览器 Cookie</strong>。 3️⃣ <strong>客户端请求时携带 <code>sessionID</code></strong>，服务器验证身份。</p><p>✅ <strong>特点</strong>：</p><ul><li><strong>更安全</strong>（数据存于服务器）。</li><li><strong>生命周期短</strong>（默认<strong>会话级</strong>，可配置过期时间）。</li><li><strong>存储大小远大于 Cookie</strong>（但占服务器资源）。</li></ul><p>✅ <strong>Session 共享方案（分布式架构）</strong>：</p><table><thead><tr><th><strong>方案</strong></th><th><strong>优缺点</strong></th></tr></thead><tbody><tr><td><strong>Session 复制</strong></td><td>🚀 容错性高 ❌ 网络负担大</td></tr><tr><td><strong>粘性 Session</strong>（IP 绑定）</td><td>🚀 低成本 ❌ 服务器宕机会丢失</td></tr><tr><td><strong>Redis / Memcached 共享 Session</strong></td><td>🚀 高性能，持久化 ❌ 需额外维护 Redis</td></tr><tr><td><strong>Session 持久化（数据库）</strong></td><td>🚀 可恢复 ❌ 读写性能低</td></tr></tbody></table><hr><h3 id="_4️⃣-什么是-token-🎫" tabindex="-1"><a class="header-anchor" href="#_4️⃣-什么是-token-🎫"><span><strong>4️⃣ 什么是 Token？🎫</strong></span></a></h3><p>✅ <strong>定义</strong>：用户身份认证凭证，服务器<strong>无状态</strong>存储。 ✅ <strong>认证流程</strong>： 1️⃣ 用户 <strong>登录</strong>，服务器生成 <code>token</code>（<code>uid + 时间戳 + 签名</code>）。 2️⃣ <code>token</code> <strong>存入客户端</strong>（<code>Cookie</code> / <code>localStorage</code> / <code>SessionStorage</code>）。 3️⃣ 客户端每次请求时，<strong>携带 <code>token</code></strong>（放 <code>Authorization</code> 头部）。 4️⃣ 服务器 <strong>校验 <code>token</code></strong>，成功则返回数据。</p><p>✅ <strong>优缺点</strong>：</p><table><thead><tr><th><strong>特点</strong></th><th><strong>Session</strong></th><th><strong>Token</strong></th></tr></thead><tbody><tr><td><strong>存储方式</strong></td><td>服务器端</td><td>客户端</td></tr><tr><td><strong>跨域支持</strong></td><td>❌ 依赖 Cookie</td><td>✅ 可直接传递</td></tr><tr><td><strong>安全性</strong></td><td>✅ 服务端管理</td><td>❌ 客户端存储易被窃取</td></tr><tr><td><strong>适用场景</strong></td><td>Web 站点</td><td><strong>微服务 &amp; 移动端</strong></td></tr></tbody></table><p>✅ <strong>Refresh Token（刷新令牌）</strong>：</p><ul><li><code>Access Token</code> 有效期较短，<code>Refresh Token</code> <strong>用于刷新 <code>Access Token</code></strong>，无需用户重新登录。</li><li><strong>避免频繁输入用户名密码，提高安全性</strong>。</li></ul><hr><h3 id="_5️⃣-什么是-jwt-json-web-token-🔏" tabindex="-1"><a class="header-anchor" href="#_5️⃣-什么是-jwt-json-web-token-🔏"><span><strong>5️⃣ 什么是 JWT（JSON Web Token）？🔏</strong></span></a></h3><p>✅ <strong>定义</strong>：基于 JSON 的身份认证方式，<strong>用于无状态认证</strong>（API 调用）。 ✅ <strong>组成</strong>（<code>header.payload.signature</code>）：</p><ul><li><code>header</code>：算法（如 <code>HS256</code>）。</li><li><code>payload</code>：用户信息（如 <code>userId</code>、<code>exp</code>）。</li><li><code>signature</code>：防篡改签名（<code>HMACSHA256</code>）。</li></ul><p>✅ <strong>认证流程</strong>： 1️⃣ <strong>用户登录</strong>，服务器生成 <code>JWT</code> 并返回客户端。 2️⃣ 客户端 <strong>存储 <code>JWT</code></strong> 并在 <strong>请求头</strong> 发送 <code>Authorization: Bearer &lt;token&gt;</code>。 3️⃣ <strong>服务器解析 <code>JWT</code></strong>，验证身份。</p><p>✅ <strong>JWT vs Token 区别</strong></p><table><thead><tr><th><strong>特点</strong></th><th><strong>Token</strong></th><th><strong>JWT</strong></th></tr></thead><tbody><tr><td><strong>存储方式</strong></td><td>服务端</td><td>客户端</td></tr><tr><td><strong>跨域支持</strong></td><td>✅</td><td>✅</td></tr><tr><td><strong>是否包含用户信息</strong></td><td>❌</td><td>✅</td></tr><tr><td><strong>服务器是否需要存储</strong></td><td>✅</td><td>❌</td></tr><tr><td><strong>适用场景</strong></td><td><strong>微服务认证</strong></td><td><strong>单点登录（SSO）</strong></td></tr></tbody></table><p>✅ <strong>JWT 优缺点</strong> ✔️ <strong>无状态</strong>：服务端不存储 Session，适合微服务 &amp; SSO。 ✔️ <strong>高效</strong>：减少数据库查询次数。 ❌ <strong>无法废弃</strong>：一旦签发，无法主动撤销。 ❌ <strong>安全性</strong>：<code>JWT</code> 一旦泄露，任何人都可使用。</p><p>✅ <strong>优化 JWT</strong></p><ul><li><strong>HTTPS 传输</strong>（防止中间人攻击）。</li><li><strong>Token 过期时间要短</strong>（防止长期滥用）。</li><li><strong>黑名单机制</strong>（如存储废弃 <code>JWT</code>）。</li></ul><hr><h3 id="_6️⃣-常见前后端鉴权方式-🔑" tabindex="-1"><a class="header-anchor" href="#_6️⃣-常见前后端鉴权方式-🔑"><span><strong>6️⃣ 常见前后端鉴权方式 🔑</strong></span></a></h3><p>✅ <strong>Session-Cookie</strong>（适合 Web 站点）。 ✅ <strong>Token 认证</strong>（适合移动端 / API 认证）。 ✅ <strong>OAuth 2.0</strong>（适合第三方授权）。 ✅ <strong>JWT</strong>（适合微服务 &amp; SSO）。</p><hr><h3 id="_7️⃣-防攻击技巧-⚠️" tabindex="-1"><a class="header-anchor" href="#_7️⃣-防攻击技巧-⚠️"><span><strong>7️⃣ 防攻击技巧 ⚠️</strong></span></a></h3><p>✅ <strong>防止 CSRF 攻击</strong>：</p><ul><li><strong>使用 <code>SameSite</code> 属性</strong>，限制 Cookie 发送范围。</li><li><strong>使用 Token 认证</strong>，避免依赖 Cookie。</li></ul><p>✅ <strong>防止 XSS 攻击</strong>：</p><ul><li><strong>设置 <code>httpOnly</code></strong>，防止 JS 读取 Cookie。</li><li><strong>对输入进行转义处理</strong>（防止注入）。</li></ul><p>✅ <strong>防止 Cookie 窃取</strong>：</p><ul><li><strong>启用 <code>Secure</code></strong>，仅 HTTPS 传输。</li><li><strong>Cookie 过期时间尽量短</strong>。</li></ul><p>✅ <strong>防止 Token 泄露</strong>：</p><ul><li><strong>使用短 Token + Refresh Token</strong>（定期更新）。</li><li><strong>Token 存储位置</strong>：<strong>不建议 localStorage（易受 XSS 攻击）</strong>，可以放 <strong>httpOnly Cookie</strong>。</li></ul><hr><h3 id="_8️⃣-结论-如何选择-🧐" tabindex="-1"><a class="header-anchor" href="#_8️⃣-结论-如何选择-🧐"><span><strong>8️⃣ 结论：如何选择？🧐</strong></span></a></h3><table><thead><tr><th><strong>适用场景</strong></th><th><strong>推荐方式</strong></th></tr></thead><tbody><tr><td><strong>普通 Web 登录</strong></td><td><code>Session + Cookie</code></td></tr><tr><td><strong>前后端分离 API 认证</strong></td><td><code>Token</code>（存 <code>httpOnly Cookie</code>）</td></tr><tr><td><strong>移动端 / 微服务 / SSO</strong></td><td><code>JWT</code></td></tr><tr><td><strong>OAuth 授权</strong></td><td><code>OAuth 2.0 + JWT</code></td></tr></tbody></table><p>✅ <strong>如果是 Web 项目，优先考虑 <code>Session + Cookie</code></strong>（简单 &amp; 安全）。 ✅ <strong>如果是微服务 / 移动端，推荐 <code>JWT</code></strong>（无状态 &amp; 跨域支持）。 ✅ <strong>如果涉及第三方授权，使用 <code>OAuth 2.0</code></strong>（如 GitHub、Google 登录）。</p><p>🚀 <strong>面试时牢记：安全性、适用场景、优势 &amp; 劣势！</strong></p>',54)]))}]]),d=JSON.parse('{"path":"/posts/interview/JWT.html","title":"JWT","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-03-11T00:00:00.000Z","category":["面试"],"tag":["JWT"],"description":"JWT Cookie、Session、Token、JWT 面试八股文 🔥 1️⃣ 认证（Authentication） vs 授权（Authorization）🔑 ✅ 认证（身份验证）：确认 “你是你自己”（登录、指纹识别）。 ✅ 授权（访问权限）：确认 “你能访问什么”（应用权限、OAuth 授权）。 ✅ 凭证（Credentials）：证明身份...","head":[["meta",{"property":"og:url","content":"https://github.com/Mly66/blog/posts/interview/JWT.html"}],["meta",{"property":"og:site_name","content":"马瑶瑶瑶瑶瑶"}],["meta",{"property":"og:title","content":"JWT"}],["meta",{"property":"og:description","content":"JWT Cookie、Session、Token、JWT 面试八股文 🔥 1️⃣ 认证（Authentication） vs 授权（Authorization）🔑 ✅ 认证（身份验证）：确认 “你是你自己”（登录、指纹识别）。 ✅ 授权（访问权限）：确认 “你能访问什么”（应用权限、OAuth 授权）。 ✅ 凭证（Credentials）：证明身份..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-11T14:03:57.000Z"}],["meta",{"property":"article:tag","content":"JWT"}],["meta",{"property":"article:published_time","content":"2024-03-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-11T14:03:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JWT\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-11T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-11T14:03:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Mly\\",\\"url\\":\\"https://mly66.github.io/blog/\\"}]}"]]},"headers":[{"level":2,"title":"Cookie、Session、Token、JWT 面试八股文 🔥","slug":"cookie、session、token、jwt-面试八股文-🔥","link":"#cookie、session、token、jwt-面试八股文-🔥","children":[{"level":3,"title":"1️⃣ 认证（Authentication） vs 授权（Authorization）🔑","slug":"_1️⃣-认证-authentication-vs-授权-authorization-🔑","link":"#_1️⃣-认证-authentication-vs-授权-authorization-🔑","children":[]},{"level":3,"title":"2️⃣ 什么是 Cookie？🍪","slug":"_2️⃣-什么是-cookie-🍪","link":"#_2️⃣-什么是-cookie-🍪","children":[]},{"level":3,"title":"3️⃣ 什么是 Session？📦","slug":"_3️⃣-什么是-session-📦","link":"#_3️⃣-什么是-session-📦","children":[]},{"level":3,"title":"4️⃣ 什么是 Token？🎫","slug":"_4️⃣-什么是-token-🎫","link":"#_4️⃣-什么是-token-🎫","children":[]},{"level":3,"title":"5️⃣ 什么是 JWT（JSON Web Token）？🔏","slug":"_5️⃣-什么是-jwt-json-web-token-🔏","link":"#_5️⃣-什么是-jwt-json-web-token-🔏","children":[]},{"level":3,"title":"6️⃣ 常见前后端鉴权方式 🔑","slug":"_6️⃣-常见前后端鉴权方式-🔑","link":"#_6️⃣-常见前后端鉴权方式-🔑","children":[]},{"level":3,"title":"7️⃣ 防攻击技巧 ⚠️","slug":"_7️⃣-防攻击技巧-⚠️","link":"#_7️⃣-防攻击技巧-⚠️","children":[]},{"level":3,"title":"8️⃣ 结论：如何选择？🧐","slug":"_8️⃣-结论-如何选择-🧐","link":"#_8️⃣-结论-如何选择-🧐","children":[]}]}],"git":{"createdTime":1741701837000,"updatedTime":1741701837000,"contributors":[{"name":"Mly66","email":"3127328609@qq.com","commits":1}]},"readingTime":{"minutes":3.96,"words":1189},"filePathRelative":"posts/interview/JWT.md","localizedDate":"2024年3月11日","excerpt":"\\n<h2><strong>Cookie、Session、Token、JWT 面试八股文 🔥</strong></h2>\\n<hr>\\n<h3><strong>1️⃣ 认证（Authentication） vs 授权（Authorization）🔑</strong></h3>\\n<p>✅ <strong>认证</strong>（身份验证）：确认 <strong>“你是你自己”</strong>（登录、指纹识别）。\\n✅ <strong>授权</strong>（访问权限）：确认 <strong>“你能访问什么”</strong>（应用权限、OAuth 授权）。\\n✅ <strong>凭证</strong>（Credentials）：证明身份的媒介，如 <strong>Cookie、Session、Token、JWT</strong>。</p>","autoDesc":true}')}}]);