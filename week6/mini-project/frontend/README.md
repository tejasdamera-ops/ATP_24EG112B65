# Employee Management System - Frontend

A React + Vite web application for managing employee records with a modern, responsive UI.

## Features

- ✅ View all employees
- ✅ Create new employees
- ✅ Edit employee details
- ✅ Delete employees
- ✅ Form validation with React Hook Form
- ✅ State management with Zustand
- ✅ Responsive design with Tailwind CSS
- ✅ Environment-based API configuration
- ✅ Production-ready build optimization

## Tech Stack

- React 19
- Vite
- React Router
- React Hook Form
- Axios
- Zustand
- Tailwind CSS

## Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see backend README)

## Installation

1. **Install dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Create .env file**

   ```bash
   cp .env.example .env
   ```

3. **Update .env with backend API URL**
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

## Development

**Start development server**

```bash
npm run dev
```

App will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

This generates optimized files in the `dist/` folder.

## Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CreateEmp.jsx       # Create employee form
│   │   ├── ListOfEmp.jsx       # Employee list page
│   │   ├── EditEmployee.jsx    # Edit employee form
│   │   └── ...
│   ├── config/
│   │   └── apiConfig.js        # API configuration
│   ├── pages/
│   ├── store/                  # Zustand stores
│   ├── context/                # React context
│   ├── assets/
│   ├── main.jsx                # Entry point
│   └── App.jsx                 # Root component
├── index.html
├── vite.config.js              # Vite configuration
├── vercel.json                 # Vercel deployment config
├── .env                        # Environment variables
├── .env.example                # Example env file
├── package.json
└── README.md
```

## API Configuration

API endpoints are centrally managed in `src/config/apiConfig.js`:

```javascript
const API_ENDPOINTS = {
  EMPLOYEES: `${API_BASE_URL}/emp-api/employees`,
};
```

Update `VITE_API_BASE_URL` in `.env` to change API server.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository on [vercel.com](https://vercel.com)
3. Set root directory to `frontend`
4. Add environment variable: `VITE_API_BASE_URL`
5. Deploy!

### Netlify

1. Build: `npm run build`
2. Deploy `dist/` folder to [netlify.com](https://netlify.com)
3. Set environment variables in site settings

### GitHub Pages

Configure in `vite.config.js` and deploy `dist/` folder.

See [DEPLOYMENT.md](../DEPLOYMENT.md) for detailed instructions.

## Environment Variables

| Variable            | Description     | Example                 |
| ------------------- | --------------- | ----------------------- |
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5000` |

## Performance Tips

1. **Lazy loading** - Routes are code-split automatically
2. **Image optimization** - Place images in `/public`
3. **Build optimization** - Vite handles minification
4. **Caching** - Set cache headers in deployment

## Browser Support

- Chrome
- Firefox
- Safari
- Edge

## Troubleshooting

### API Calls Fail

- Check `VITE_API_BASE_URL` in `.env`
- Ensure backend server is running
- Check browser console for CORS errors

### Build Fails

- Clear `node_modules`: `rm -rf node_modules`
- Reinstall: `npm install`
- Check for TypeScript errors: `npm run build`

### Port Already in Use

- Change port in Vite config
- Or kill process: `lsof -i :5173` (Mac/Linux)

## License

ISC

## Author

Your Name
