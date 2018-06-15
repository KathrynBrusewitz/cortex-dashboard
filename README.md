<h1 align="center">
  Cortex Dashboard
</h1>

![Cortex Dashboard](https://dzwonsemrish7.cloudfront.net/items/1o1o0h1R333l0L1z1H14/Screen%20Recording%202018-06-14%20at%2005.35%20PM.gif?v=d4aa0f13)

Cortex is an open-source content management system (CMS) that is custom-made for Grey Matters Journal. The dashboard and API is open for use and additional development for anyone with similar needs as Grey Matters Journal, such as other science content creators who need specialized tools and plugins to easily create and deliver a wide range of content type and media to readers. 

The goal for Cortex is to support the creation, management, and delivery of data visualizations, interactive stories, and immersive scientific content in addition to the basic needs of an organization, i.e. userbase management, accounts, analytics, and notifications.

# Documentation

- Getting Started
  - [Setup for Development](./docs/dev-setup.md)
  - [App Structure and Design](./docs/dev-structure.md)
  - [Development Style Guide](./docs/dev-style.md)
- Development Docs
  - [Component Lifecycle](./docs/component-lifecycle.md)
  - [Link Styling](./docs/link-styling.md)
  - [Routing](./docs/routing.md)
  - [Text Editor](./docs/text-editor.md)
- Production Docs
  - [Building and Deployment](./docs/production-build-deploy.md)
- Miscellaneous
  - [Common CRA Tasks](./docs/CRA.md)

# Cortex API

Cortex Dashboard queries the [Cortex API](https://github.com/KathrynBrusewitz/cortex-api). Please read the README available in the API repository. It explains the full stack in much greater detail.

# Todo

Immediate:
- Action to Download Userbase CSV
- Google Analytics Components
- Invite Page
- Reset Page
- Replace Placeholder Logo with Nicole's Logo

Not Immediate:
- Get application approved for AWS SES to send emails

Nice to Have:
- Use Google Calendar API for Events
- User Settings  
- Mobile App Settings  
- Dashboard Settings
- Publish diagram for how the API should process Slate Text Editor formats
- Unit Tests - These were disregarded to meet the initial 3-month MVP deadline
