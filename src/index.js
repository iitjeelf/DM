// SIMPLE TEACHER PORTAL
export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    if (url.pathname === '/') {
      const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Teacher Portal</title>
        <style>
          body { font-family: Arial; padding: 40px; text-align: center; }
          .login-box { background: #f0f0f0; padding: 30px; border-radius: 10px; display: inline-block; }
          button { padding: 12px 24px; background: #4285f4; color: white; border: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>Teacher File Manager</h1>
        <div class="login-box">
          <h3>Access Code: teacher123</h3>
          <input type="password" id="pass" placeholder="Enter code">
          <button onclick="login()">Login</button>
        </div>
        <script>
          function login() {
            if (document.getElementById('pass').value === 'teacher123') {
              window.location.href = '/teacher';
            } else {
              alert('Wrong password');
            }
          }
        </script>
      </body>
      </html>`;
      
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    if (url.pathname === '/teacher') {
      const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Teacher Dashboard</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          .upload { border: 3px dashed #4285f4; padding: 40px; text-align: center; margin: 20px; }
        </style>
      </head>
      <body>
        <h1>Teacher Portal</h1>
        <div class="upload" onclick="document.getElementById('fileInput').click()">
          <h3>📁 Click to Upload Files</h3>
          <input type="file" id="fileInput" multiple style="display:none">
        </div>
        <button onclick="upload()">Upload</button>
        <script>
          function upload() {
            alert('Files uploaded!');
          }
        </script>
      </body>
      </html>`;
      
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    return new Response('Not found', { status: 404 });
  }
};
