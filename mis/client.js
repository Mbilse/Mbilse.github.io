// 配置项（需手动修改！！！）
const CONFIG = {
  clientId: "Iv23li1Ny5hIIIvO8WtD",  // GitHub App 的 Client ID
  encryptedSecret: "U2FsdGVkX19Y7qz5ZJ6w3w1+3jK7sJQeXr7Tl1o2W3E=", // 加密后的 Client Secret
  repo: "mbilse/mbilse.github.io",           // 目标仓库
  category: "ds",       // 讨论分类
  cryptoKey: "mySecretKey2024!"     // 自定义加密密钥
};

class GitHubClient {
  constructor() {
    this.token = localStorage.getItem('gh_token');
    this.init();
  }

  async init() {
    await this.handleOAuthCallback();
    document.getElementById('login').addEventListener('click', () => this.startOAuth());
    if (this.token) this.loadDiscussions();
  }

  startOAuth() {
    const redirectUri = encodeURIComponent(window.location.href);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CONFIG.clientId}&redirect_uri=${redirectUri}&scope=repo,discussions:write`;
  }

  async handleOAuthCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (code) {
      try {
        // 解密 Client Secret
        const clientSecret = CryptoJS.AES.decrypt(
          CONFIG.encryptedSecret, 
          CONFIG.cryptoKey
        ).toString(CryptoJS.enc.Utf8);

        // 获取 Access Token
        const res = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            client_id: CONFIG.clientId,
            client_secret: clientSecret,
            code: code
          })
        });
        
        const { access_token } = await res.json();
        this.token = access_token;
        localStorage.setItem('gh_token', access_token);
        window.history.replaceState({}, '', window.location.pathname);
        this.loadDiscussions();
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }

  async loadDiscussions() {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${CONFIG.repo}/discussions?category=${CONFIG.category}`，
        { headers: { Authorization: `Bearer ${this.token}` } }
      );
      const discussions = await res.json();
      this.renderDiscussions(discussions);
    } catch (err) {
      console.error('Failed to load:', err);
    }
  }

  renderDiscussions(discussions) {
    const container = document.getElementById('discussions');
    container.innerHTML = discussions.map(d => `
      <div class="comment">
        <h3>${d.title}</h3>
        <div>${d.body}</div>
      </div>
    `).join('');
  }
}

// 初始化
new GitHubClient();
