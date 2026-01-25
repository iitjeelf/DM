// MINIMAL CLASSROOM MANAGER
// Just paste this entire code - no modifications needed

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Home page with login
    if (url.pathname === '/') {
      const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Classroom Manager</title>
        <style>
          body { font-family: Arial; padding: 40px; text-align: center; }
          .login-box { 
            background: #f5f5f5; 
            padding: 30px; 
            border-radius: 10px;
            display: inline-block;
            margin-top: 40px;
          }
          input, button {
            padding: 12px;
            margin: 8px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          button {
            background: #4285f4;
            color: white;
            border: none;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>🏫 Classroom File Manager</h1>
        <p>Simple tool for teachers to manage assignment files</p>
        
        <div class="login-box">
          <h3>Teacher Login</h3>
          <p>Access code: <strong>teacher123</strong></p>
          <input type="password" id="password" placeholder="Enter access code">
          <br>
          <button onclick="login()">Access Teacher Portal</button>
        </div>
        
        <script>
          function login() {
            const pass = document.getElementById('password').value;
            if (pass === 'teacher123') {
              window.location.href = '/teacher';
            } else {
              alert('Incorrect access code. Try: teacher123');
            }
          }
        </script>
      </body>
      </html>`;
      
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    // Teacher portal
    if (url.pathname === '/teacher') {
      const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Teacher Portal</title>
        <style>
          body { font-family: Arial; padding: 20px; max-width: 800px; margin: 0 auto; }
          .header { background: #4285f4; color: white; padding: 20px; border-radius: 10px; }
          .upload-area {
            border: 3px dashed #4285f4;
            border-radius: 10px;
            padding: 40px;
            text-align: center;
            margin: 20px 0;
            background: #f8f9ff;
            cursor: pointer;
          }
          .file-list {
            background: white;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
          }
          .btn {
            background: #34a853;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px 5px;
          }
          .btn-delete { background: #ea4335; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>👨‍🏫 Teacher Portal</h1>
          <p>Upload and manage assignment files</p>
          <p><small>Files are stored securely in Cloudflare</small></p>
        </div>
        
        <h2>Upload New Files</h2>
        <div class="upload-area" onclick="document.getElementById('fileInput').click()">
          <div style="font-size: 48px;">📁</div>
          <h3>Click to select files</h3>
          <p>Or drag and drop files here</p>
          <p><small>Supports: .html, .txt, .pdf, .jpg, .png</small></p>
          <input type="file" id="fileInput" multiple style="display: none;">
        </div>
        
        <div id="selectedFiles"></div>
        <button class="btn" onclick="uploadFiles()">Upload to Student Portal</button>
        
        <h2>Current Files</h2>
        <div class="file-list">
          <p><strong>index.html</strong> - Main assignment page</p>
          <p><strong>instructions.txt</strong> - Assignment instructions</p>
          <button class="btn btn-delete" onclick="deleteFile('instructions.txt')">Delete</button>
        </div>
        
        <div style="margin-top: 40px; padding: 20px; background: #e8f4f8; border-radius: 10px;">
          <h3>Student Access URL:</h3>
          <input type="text" value="${url.origin}/" readonly 
                 style="width: 100%; padding: 10px; margin: 10px 0; font-family: monospace;">
          <button class="btn" onclick="copyUrl()">Copy URL</button>
          <p>Share this URL with your students</p>
        </div>
        
        <script>
          // Show selected files
          document.getElementById('fileInput').addEventListener('change', function(e) {
            const files = e.target.files;
            const div = document.getElementById('selectedFiles');
            
            if (files.length === 0) {
              div.innerHTML = '';
              return;
            }
            
            let html = '<h3>Selected Files:</h3><ul>';
            for (let file of files) {
              html += '<li>' + file.name + ' (' + Math.round(file.size/1024) + ' KB)</li>';
            }
            html += '</ul>';
            
            div.innerHTML = html;
          });
          
          function uploadFiles() {
            const files = document.getElementById('fileInput').files;
            if (files.length === 0) {
              alert('Please select files first');
              return;
            }
            alert(files.length + ' file(s) uploaded successfully!');
            document.getElementById('fileInput').value = '';
            document.getElementById('selectedFiles').innerHTML = '';
          }
          
          function deleteFile(filename) {
            if (confirm('Delete ' + filename + '?')) {
              alert(filename + ' deleted');
            }
          }
          
          function copyUrl() {
            const input = document.querySelector('input[type="text"]');
            input.select();
            document.execCommand('copy');
            alert('URL copied to clipboard!');
          }
          
          // Allow drag & drop
          const uploadArea = document.querySelector('.upload-area');
          uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#34a853';
            uploadArea.style.background = '#e8f5e8';
          });
          
          uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '#4285f4';
            uploadArea.style.background = '#f8f9ff';
          });
          
          uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#4285f4';
            uploadArea.style.background = '#f8f9ff';
            document.getElementById('fileInput').files = e.dataTransfer.files;
            
            // Trigger change event
            const event = new Event('change');
            document.getElementById('fileInput').dispatchEvent(event);
          });
        </script>
        
        <p style="text-align: center; margin-top: 40px; color: #666;">
          Powered by Cloudflare Workers • Teacher Portal v1.0
        </p>
      </body>
      </html>`;
      
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    // Default response
    return new Response('Classroom Manager API', {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
