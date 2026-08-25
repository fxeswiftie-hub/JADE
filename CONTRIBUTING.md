# Contributing to JADE

## 🤝 How to Contribute

We love contributions! Here's how you can help make JADE better.

### Reporting Bugs

1. Check if bug is already reported in [Issues](https://github.com/fxeswiftie-hub/JADE/issues)
2. If not, click "New Issue"
3. Title: Describe the bug briefly
4. Description: Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable
   - Browser/OS info

### Suggesting Features

1. Check [Issues](https://github.com/fxeswiftie-hub/JADE/issues) for similar requests
2. If not found, create new issue with label "enhancement"
3. Describe:
   - Feature use case
   - How it would help users
   - Proposed implementation (if you have ideas)

### Contributing Code

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/JADE.git
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes locally

4. **Commit changes**
   ```bash
   git commit -m "feat: description of changes"
   ```

5. **Push to GitHub**
   ```bash
   git push origin feature/your-feature
   ```

6. **Create Pull Request**
   - Reference related issue
   - Describe changes clearly
   - Include screenshots if UI changes

### Code Style

- Use TypeScript
- Follow ESLint rules
- Use Prettier for formatting
- Add comments for non-obvious code
- Keep functions small and focused

### Commit Messages

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style
- `refactor:` Code refactoring
- `test:` Tests

Example: `feat: add user profile settings page`

### Pull Request Guidelines

- Keep PRs focused on one feature/fix
- Include tests for new features
- Update documentation
- Describe what problem it solves
- Link related issues

---

## 📋 Development Guidelines

### Project Structure

- Keep components in `/components`
- Keep utilities in `/lib`
- Keep API routes in `/app/api`
- Keep pages in `/app`

### Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### Database

- Use Mongoose schemas
- Add validation in schemas
- Use indexes for performance
- Document complex queries

---

## 🎨 Design Guidelines

### Colors (from tailwind.config.ts)

- **Primary**: Jade purple (#A78BFA)
- **Secondary**: Rose pink (#FBCFE8)
- **Accent**: Cyan (#67E8F9)
- **Neutral**: Gray scale

### Components

- Use rounded-lg for small elements
- Use rounded-2xl for cards
- Use rounded-3xl for large sections
- Use shadow-soft for subtle shadows
- Use shadow-medium for interactive elements

### Animations

- fade-in: General fade
- slide-up: Page transitions
- pulse-slow: Loading indicators
- Keep animations smooth (300ms)

---

## 🚀 Deployment

- Always test locally first
- Run `npm run build` to check for errors
- Keep sensitive data in environment variables
- Test all APIs before deploying
- Use staging environment if possible

---

## ❓ Questions?

- Email: support@jade.com
- Discord: [Join our server](https://discord.gg/jade)
- GitHub Issues: Ask in discussion

---

Thank you for contributing to JADE! 🎉
