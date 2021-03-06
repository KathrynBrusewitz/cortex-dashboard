import React from 'react';

import Cookies from 'universal-cookie';

export const cookies = new Cookies();

export const baseURL = 'https://cortexapi.com/1.0/'; // API v1.0

export const rules = [
  {
    deserialize(el, next) {
      //not gonna use this
    },
    serialize(obj, children) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'paragraph':
            return <p>{children}</p>
          case 'block-quote':
            return <blockquote>{children}</blockquote>
          case 'bulleted-list':
            return <ul>{children}</ul>
          case 'heading-one':
            return <h1>{children}</h1>
          case 'heading-two':
            return <h2>{children}</h2>
          case 'list-item':
            return <li>{children}</li>
          case 'numbered-list':
            return <ol>{children}</ol>
          case 'link':
            console.log(obj);
            const { data } = obj;
            const href = data.get('href');
            return (
              <a href={href}>
                {children}
              </a>
            );
          case 'image':
            const src = obj.data.get('src')
            const alt = obj.data.get('alt')
            const style = { display: 'block' }
            return (
              <img src={src} style={style} alt={alt || src} />
            );
          default:
            return
        }
      }
    },
  },
  {
    deserialize(el, next) {
      //not gonna use this
    },
    serialize(obj, children) {
      if (obj.object === 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>
          case 'code':
            return <code>{children}</code>
          case 'italic':
            return <em>{children}</em>
          case 'underlined':
            return <u>{children}</u>
          default:
            return
        }
      }
    },
  },
  {
    deserialize: function (el, next) {
      //not gonna use this
    },
    serialize: function (object, children) {

      if (object.object !== 'inline') {
        return;
      }

      switch (object.type) {
        case 'link':
          return <a href={object.data.get('href')}>{children}</a>;
        default:
          return;
      }
    }
  },
]
