# Contributing to My Awesome Blog

First off, thank you for considering contributing to this blog! Your help is greatly appreciated.

## How to Contribute

### Setting Up the Project

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** to your local machine.
3.  **Install the dependencies**:
    ```bash
    cd my-blog
    bundle install
    ```
4.  **Run the Jekyll server**:
    ```bash
    bundle exec jekyll serve
    ```
    The site will be available at `http://localhost:4000`.

### Writing a New Post

To create a new blog post, follow these steps:

1.  **Create a new file** in the `_posts` directory.
2.  **Name the file** using the following format: `YYYY-MM-DD-your-post-title.md`.
3.  **Add the front-matter** to the top of the file. Here's a template:

    ```yaml
    ---
    layout: post
    title:  "Your Post Title"
    date:   YYYY-MM-DD HH:MM:SS +ZZZZ
    categories: jekyll update
    lang: en # or 'ja' for Japanese
    ref: your_post_ref # a unique reference for the post
    ---
    ```

    - `layout`: Should always be `post`.
    - `title`: The title of your post.
    - `date`: The date and time the post was published.
    - `categories`: The categories for your post.
    - `lang`: The language of the post (`en` for English, `ja` for Japanese).
    - `ref`: A unique reference for the post. This is used to link translations of the same post together.

4.  **Write your post** in Markdown.

### Internationalization (i18n)

This blog supports both English and Japanese posts. To create a post in a different language, simply create a new file with the same `ref` in the front-matter and set the `lang` to the appropriate language code.

For example, to create a Japanese version of an English post, you would create a new file with `lang: ja` and the same `ref` as the English post.

### Code Formatting

This project uses [Prettier](https://prettier.io/) to format code. Before submitting a pull request, please run Prettier to ensure your code is formatted correctly.

```bash
npm install -g prettier # if you don't have it installed
prettier --write .
```

Thank you for your contribution!