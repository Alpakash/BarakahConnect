# Barakah Connect

An Islamic networking community in the Netherlands. Connecting professionals, entrepreneurs, and students to foster growth, collaboration, and community.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **CMS**: [Sanity CMS](https://www.sanity.io/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## ✨ Key Features

- **Networking Hub**: Connect with other professionals in the Netherlands.
- **Events & Workshops**: Stay updated on upcoming community gatherings.
- **Community Directory**: Find and collaborate with like-minded individuals.
- **Dynamic Content**: Managed via Sanity CMS for easy updates.

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/barakah-connect.git
   cd barakah-connect
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Sanity credentials:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `app/` - Next.js App Router (Layouts, Pages, Components)
- `components/` - Reusable UI components
- `styles/` - Global styles and Tailwind configuration
- `public/` - Static assets

## 📦 Deployment

The easiest way to deploy is via [Vercel](https://vercel.com/new).

1. Push your code to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel.
3. Configure Environment Variables.
4. Deploy!

---

Built with Barakah. 🤲
