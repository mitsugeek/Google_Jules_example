---
layout: page
title: Tags
permalink: /tags/
---

<div class="tags-archive">
  <ul class="tags-list">
    {% for tag in site.tags %}
      <li class="tag-item">
        <a href="#{{ tag[0] | slugify }}">{{ tag[0] }}</a>
      </li>
    {% endfor %}
  </ul>

  <div class="tags-content">
    {% for tag in site.tags %}
      <h2 id="{{ tag[0] | slugify }}">{{ tag[0] }}</h2>
      <ul class="post-list">
        {% for post in tag[1] %}
          <li>
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
          </li>
        {% endfor %}
      </ul>
    {% endfor %}
  </div>
</div>