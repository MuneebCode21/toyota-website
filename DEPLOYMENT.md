# 🚀 Deployment Guide - Toyota Website

This guide covers deploying the Toyota website to various hosting platforms.

## Table of Contents
1. [Backend Deployment](#backend-deployment)
2. [Frontend Deployment](#frontend-deployment)
3. [Full-Stack Deployment](#full-stack-deployment)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)

---

## Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create New App**
```bash
heroku create toyota-api-demo
```

4. **Set Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=3001
```

5. **Deploy**
```bash
git push heroku main
```

6. **Open App**
```bash
heroku open
```

---

### Option 2: Railway

1. **Install Railway CLI**
```bash
npm i -g @railway/cli
```

2. **Login**
```bash
railway login
```

3. **Initialize Project**
```bash
railway init
```

4. **Deploy**
```bash
railway up
```

5. **Add Domain** (Optional)
```bash
railway domain
```

---

### Option 3: Render

1. **Push code to GitHub**

2. **Go to [Render Dashboard](https://render.com)**

3. **Create New Web Service**
   - Connect your GitHub repository
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Set Environment Variables**
   - Add `NODE_ENV=production`
   - Add any other required variables

5. **Deploy**

---

### Option 4: DigitalOcean App Platform

1. **Push code to GitHub**

2. **Go to DigitalOcean Apps**

3. **Create New App**
   - Connect GitHub repository
   - Select Node.js environment
   - Build Command: `npm install`
   - Run Command: `npm start`

4. **Configure**
   - Set environment variables
   - Choose instance size

5. **Deploy**

---

## Frontend Deployment

### Option 1: Vercel (Recommended for React)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login**
```bash
vercel login
```

3. **Build**
```bash
npm run build
```

4. **Deploy**
```bash
vercel --prod
```

**Or via GitHub:**
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Set environment variables:
   - `REACT_APP_API_URL=https://your-backend-url.com/api`

---

### Option 2: Netlify

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod
```

**Or via GitHub:**
1. Push code to GitHub
2. Import project on [Netlify](https://netlify.com)
3. Configure:
   - Build Command: `npm run build`
   - Publish Directory: `build`
4. Set environment variables in Netlify dashboard

---

### Option 3: GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**
```json
{
  "homepage": "https://yourusername.github.io/toyota-website",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. **Deploy**
```bash
npm run deploy
```

---

## Full-Stack Deployment

### Option 1: Single Server (VPS)

**Using PM2 on Ubuntu/Debian:**

1. **SSH into server**
```bash
ssh user@your-server-ip
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install PM2**
```bash
sudo npm install -g pm2
```

4. **Clone repository**
```bash
git clone https://github.com/yourusername/toyota-website.git
cd toyota-website
```

5. **Install dependencies**
```bash
npm install
```

6. **Build frontend**
```bash
npm run build
```

7. **Start with PM2**
```bash
pm2 start server.js --name toyota-api
pm2 save
pm2 startup
```

8. **Setup Nginx reverse proxy**
```bash
sudo nano /etc/nginx/sites-available/toyota
```

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. **Enable site**
```bash
sudo ln -s /etc/nginx/sites-available/toyota /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

10. **Setup SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

### Option 2: Docker Deployment

1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

2. **Create docker-compose.yml**
```yaml
version: '3.8'

services:
  toyota-web:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
    restart: unless-stopped
```

3. **Build and run**
```bash
docker-compose up -d
```

---

## Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=3001
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
```

---

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create account** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Create cluster**

3. **Get connection string**
```
mongodb+srv://username:password@cluster.mongodb.net/toyota?retryWrites=true&w=majority
```

4. **Update server.js**
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

---

### PostgreSQL (Heroku Postgres)

1. **Add Postgres addon**
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

2. **Get database URL**
```bash
heroku config:get DATABASE_URL
```

3. **Update server.js** with PostgreSQL connection

---

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connected
- [ ] SSL certificate installed
- [ ] CORS configured for production domain
- [ ] API rate limiting enabled
- [ ] Error logging configured
- [ ] Monitoring setup (e.g., New Relic, DataDog)
- [ ] Backup strategy in place
- [ ] CDN configured for static assets
- [ ] SEO meta tags updated
- [ ] Analytics integrated

---

## Performance Optimization

1. **Enable Gzip compression**
```javascript
const compression = require('compression');
app.use(compression());
```

2. **Add caching headers**
```javascript
app.use(express.static('build', {
  maxAge: '1y',
  etag: false
}));
```

3. **Use CDN** for images and static assets

4. **Minify and bundle** frontend assets

5. **Enable HTTP/2** on server

---

## Monitoring & Logs

### PM2 Monitoring
```bash
pm2 monit
pm2 logs toyota-api
```

### Heroku Logs
```bash
heroku logs --tail
```

### CloudWatch (AWS)
Set up CloudWatch for Lambda/EC2 instances

---

## Troubleshooting

**Issue: CORS errors**
- Check CORS configuration in server.js
- Verify frontend API URL is correct

**Issue: 502 Bad Gateway**
- Check if backend server is running
- Verify port configuration
- Check Nginx/proxy configuration

**Issue: Database connection failed**
- Verify DATABASE_URL is correct
- Check network access/firewall rules
- Ensure database service is running

**Issue: Build fails**
- Check Node.js version compatibility
- Clear node_modules and reinstall
- Verify all dependencies are in package.json

---

## Scaling

### Horizontal Scaling
- Use load balancer (AWS ELB, Nginx)
- Deploy multiple instances
- Implement session management (Redis)

### Vertical Scaling
- Upgrade server resources
- Optimize database queries
- Implement caching (Redis/Memcached)

---

## Security Best Practices

1. **Use HTTPS** everywhere
2. **Implement rate limiting**
3. **Sanitize user inputs**
4. **Use environment variables** for secrets
5. **Keep dependencies updated**
6. **Implement CSRF protection**
7. **Add security headers** (Helmet.js)
8. **Regular security audits**

```bash
npm audit
npm audit fix
```

---

## Cost Estimation

### Free Tier Options
- **Backend**: Railway, Render, Heroku (limited)
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Database**: MongoDB Atlas (512MB), PostgreSQL on Render

### Paid Options
- **DigitalOcean**: $5-20/month
- **AWS EC2**: $5-50/month
- **Heroku**: $7-50/month
- **Custom VPS**: $5-10/month

---

## Support

For deployment issues:
1. Check service status pages
2. Review deployment logs
3. Consult platform documentation
4. Contact platform support

---

**Happy Deploying! 🚀**
