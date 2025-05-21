# Instagram Content Manager

This application allows authenticated users to see their Instagram posts linked to a Facebook Page and post new ones through the Meta Graph API. It is designed for users with a **Business** or **Creator** Instagram account connected to a Facebook Page.

## ✨ Features

- **Facebook Authentication** – Log in via your Facebook account.
- **Page Selection** – Input your Facebook Page ID to load linked Instagram data.
- **Post Viewer** – Browse all Instagram posts, including images and videos.
- **Post Details** – View post metadata like:
  - Caption with hashtag and mention support
  - Number of likes
  - Number of comments
  - Comments list with timestamps
  - Post publish date
- **Post Creation** – Publish a new Instagram photo post by providing a **public image URL** and an optional caption.
- **Responsive Design** – Works smoothly on mobile and desktop devices.

## 📌 Requirements

- Instagram account must be either **Business** or **Creator**
- Instagram must be connected to a Facebook Page
- Facebook App must have the following permissions:
  - `instagram_basic`
  - `pages_show_list`
  - `pages_read_engagement`
  - `pages_read_user_content`
  - `instagram_manage_insights`
  - `instagram_content_publish` (requires app review for production)

## 🧠 Tech Stack

- **Frontend**: React, Vite, TailwindCSS, React Router, TanStack Query
- **Backend**: NestJS, Axios, Facebook Graph API
- **Auth**: Facebook OAuth with token exchange and secure storage
- **State & Data**: TanStack Query

## 📷 Post Creation Notes

The app uses a two-step process to create posts:

1. A media container is created using a **public image URL**.
2. The post is then published using the media container ID.

> ⚠️ Only public URLs are supported. Upload functionality is not available in this version.

## 📝 Creating a Post

To publish a post to Instagram from this app, you need to provide:

- A **public image URL** (e.g. `https://example.com/image.jpg`)
- An optional **caption**

### ⚠️ Why only a public image URL?

The Instagram Graph API requires media to be **hosted on a publicly accessible server**. This means the image must be available via a direct link (no authentication, no tokens, no private access). The API **does not** accept base64 images or file uploads from the client.

At the moment, this application does **not** include an image upload mechanism. That’s why you must provide a public URL yourself.

### 🛠️ Future improvement

A possible enhancement would be to:

1. Upload the image to a storage backend (e.g. AWS S3, Firebase, or a custom CDN),
2. Get the public URL of the uploaded image,
3. Use that URL to create the Instagram post automatically.

This workflow is not yet implemented in this version of the app, but is planned for the future.

## 🚧 Limitations

- App is currently designed for development/testing with test users and does not request advanced permissions from Meta.
- Publishing video content is not implemented.
- Error messages for failed Graph API calls may require debugging in DevTools.

## 📎 Usage

1. **Request Developer Access**

   Before you can use the app, you must request test access to the connected Facebook App.  
   Please send your **Facebook email or username** to the developer so they can add you as a test user for the app.  
   This is required in order to pass the Facebook OAuth and access the Graph API.

2. **Create a Facebook Page**

   If you don't already have a Facebook Page, create one here:  
   👉 [Create Facebook Page](https://www.facebook.com/pages/create)

   You can also connect your Instagram account to your Facebook Page directly from the [Meta Business Suite](https://business.facebook.com/). Once your page is created:
     1. Go to **Settings**.
     2. Navigate to **Linked Accounts**.
     3. Connect your Instagram account.
    
     This is also where you can find and copy your Facebook Page ID needed to use the application.

4. **Create or Switch to a Business/Creator Instagram Account**

   Your Instagram account must be either a **Business** or **Creator** type.  
   To switch your personal account:
   - Go to your Instagram app
   - Open **Settings > Account**
   - Tap **Switch to Professional Account**
   - Choose **Business** or **Creator**

5. **Connect Instagram Account to Facebook Page**

   - Go to your Facebook Page
   - Open **Settings > Linked Accounts > Instagram**
   - Log in to your Instagram account and connect it to the page
   - Make sure the connection is **active and visible**

6. **Login and Manage Posts**

   Once the above setup is complete:
   - Log in via Facebook on the app
   - Enter the **Facebook Page ID** (you can find it in your Page settings)
     ![You will find an ID here](https://github.com/user-attachments/assets/c5514579-1d1e-46cc-a807-f6efe630acd4)



       ⚠️ **Why do you need to manually enter the Page ID?**  
       Due to a known issue with the Facebook Graph API, once you connect an Instagram Business or Creator account to a Facebook Page, that Page may no longer appear in the list of accessible pages returned by the API.
      
       For example, suppose you have 5 pages: `A, B, C, D, E`.  
       Once you connect your Instagram account to page **A**, it disappears from the list of pages returned by the `/me/accounts` Graph API endpoint.  
       If you then disconnect and connect it to page **B**, page **B** also disappears.
      
       This appears to be an inconsistency or bug on Facebook's side and has been confirmed through repeated testing.
      
       ✅ As a workaround, this app allows you to manually input the **Page ID**, which ensures you can still retrieve and interact with your connected Instagram account even if the Page is no longer listed via the API.
      
       The rest of the Instagram Graph API functions (fetching posts, creating posts, viewing insights, etc.) continue to work as expected once the Page ID is known.
     
   - Start managing your Instagram content:
     - Browse existing posts
     - View full post details
     - Create new posts with a public image URL and caption
