# Literary Circle Website

A simple Flask-based website for a literary circle.

## Features

- Static pages: Home, About, Members, Works, Book Review, News, Contact
- Instagram post embedding on News page
- Simple and clean design with base color #FFF8E7
- Reset CSS for consistent styling

## Tech Stack

- Python 3.10.x
- Flask 3.0.0
- Jinja2 templating
- HTML5 / CSS3 / JavaScript (Vanilla)

## Setup Instructions

### 1. Create Virtual Environment

```bash
python3 -m venv .venv
```

### 2. Activate Virtual Environment

On macOS/Linux:
```bash
source .venv/bin/activate
```

On Windows:
```bash
.venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Application

```bash
python app.py
```

The application will be available at `http://127.0.0.1:5000/`

## Project Structure

```
mysite/
├── app.py                      # Main application
├── config.py                   # Configuration
├── requirements.txt            # Dependencies
├── .gitignore                  # Git exclusions
├── README.md                   # This file
├── routes/                     # Route definitions
│   ├── __init__.py
│   └── main.py                # Static page routes
├── templates/                  # HTML templates
│   ├── base.html.j2           # Base layout
│   ├── index.html.j2          # Home page
│   ├── about.html.j2          # About page
│   ├── members.html.j2        # Members page
│   ├── works.html.j2          # Works page
│   ├── book_review.html.j2    # Book Review page
│   ├── news.html.j2           # News page (Instagram)
│   └── contact.html.j2        # Contact page
└── static/                     # Static files
    ├── css/
    │   ├── reset.css          # CSS reset
    │   └── style.css          # Custom styles
    ├── js/
    │   └── script.js          # JavaScript
    └── images/
        └── favicon.svg        # Favicon

```

## Pages

- **Home** (`/`): Welcome page
- **About** (`/about`): About the literary circle
- **Members** (`/members`): Member information
- **Works** (`/works`): Published works
- **Book Review** (`/book-review`): Book reviews
- **News** (`/news`): Latest news with Instagram posts
- **Contact** (`/contact`): Contact information

## Instagram Embedding

To embed Instagram posts on the News page, edit `templates/news.html.j2` and replace the placeholder with actual Instagram embed code.

Example:
```html
<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/YOUR_POST_ID/">
</blockquote>
<script async src="//www.instagram.com/embed.js"></script>
```

## Deployment

This application is designed to be deployed on PythonAnywhere free tier.

Deployment steps:
1. Push code to GitHub
2. Clone repository on PythonAnywhere
3. Set up virtual environment
4. Install dependencies
5. Configure web app settings
6. Reload web app

## Changelog

### 2025-12-22
- Initial release
- Implement 7 static pages
- Add Reset CSS
- Set base color to #FFF8E7
- Add favicon
- Add Instagram embed placeholder on News page
