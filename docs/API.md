# JADE Platform - API Documentation

## Base URL
```
https://your-domain.com/api
```

## Authentication
All requests (except public endpoints) require a Bearer token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Endpoints

### Authentication

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "username": "creator123",
  "email": "creator@example.com",
  "password": "securepassword",
  "name": "Creator Name"
}

Response 201:
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "username": "creator123",
    "email": "creator@example.com",
    "name": "Creator Name"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "creator@example.com",
  "password": "securepassword"
}

Response 200:
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {...}
}
```

---

### Inspiration Library

#### Get All Inspirations
```
GET /inspiration
Authorization: Bearer {token}

Response 200:
{
  "inspirations": [
    {
      "_id": "...",
      "title": "Beautiful Sunset",
      "content": "A stunning sunset over the ocean",
      "category": "design",
      "tags": ["sunset", "nature", "photography"],
      "imageUrl": "https://...",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Create Inspiration
```
POST /inspiration
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Beautiful Sunset",
  "content": "A stunning sunset over the ocean",
  "category": "design",
  "tags": ["sunset", "nature"],
  "source": "https://example.com",
  "imageUrl": "https://..."
}

Response 201:
{
  "inspiration": {...}
}
```

---

### AI Creative Workshop

#### Send Prompt to Multiple AI Models
```
POST /ai
Authorization: Bearer {token}
Content-Type: application/json

{
  "prompt": "Help me write a catchy social media caption for a sunset photo",
  "providers": ["openai", "claude", "gemini", "deepseek"]
}

Response 200:
{
  "responses": [
    {
      "provider": "OpenAI",
      "content": "Golden hour magic ✨...",
      "usage": {
        "inputTokens": 15,
        "outputTokens": 45
      }
    },
    {
      "provider": "Claude",
      "content": "When the sky paints its masterpiece...",
      "usage": {
        "inputTokens": 15,
        "outputTokens": 42
      }
    },
    ...
  ]
}
```

---

### Portfolio Showcase

#### Get Public Portfolio
```
GET /portfolio?type=photography

Query Parameters:
- type: photography | copywriting | music | handicraft (optional)

Response 200:
{
  "portfolios": [
    {
      "_id": "...",
      "title": "Mountain Landscape",
      "description": "Beautiful mountain scenery at sunrise",
      "type": "photography",
      "imageUrl": "https://...",
      "isPublished": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### Comments

#### Get Comments for a Portfolio Item
```
GET /comments?portfolioId=xxx

Response 200:
{
  "comments": [
    {
      "_id": "...",
      "portfolioId": "xxx",
      "author": "Anonymous",
      "content": "This is amazing!",
      "isApproved": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Post Comment (Anonymous)
```
POST /comments
Content-Type: application/json

{
  "portfolioId": "xxx",
  "author": "Anonymous Visitor",
  "content": "This is amazing! Love your work!"
}

Response 201:
{
  "comment": {...},
  "message": "Comment posted successfully" or "Comment pending review"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input or missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized - token required or invalid"
}
```

### 500 Server Error
```json
{
  "error": "Server error message"
}
```

---

## Rate Limiting

- API calls are rate-limited based on your AI provider
- OpenAI: Standard rate limits apply
- Claude: Rate limits apply per API key
- Gemini: 60 requests per minute (free tier)
- DeepSeek: Check their documentation

---

## Best Practices

1. **Store tokens securely**: Don't expose tokens in client-side code
2. **Use HTTPS**: Always use encrypted connections
3. **Handle errors gracefully**: Implement proper error handling in your client
4. **Rate limit awareness**: Monitor AI API usage to avoid unexpected costs
5. **Test thoroughly**: Test all endpoints before going to production

---

## Support

For issues or questions, please open an issue on GitHub or contact support.
