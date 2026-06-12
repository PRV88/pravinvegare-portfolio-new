import { AppConfig } from './types';

export const appConfig: AppConfig = {
  header: {
    title: "Pravin Vegare",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/pravinvegare/" },
      { label: "Resume", url: "https://docs.google.com/document/d/1vR4X3Qp5uflbuoXELnDKnBl1kmIBikPUc1w5fFrowzg/edit?usp=sharing" }
    ]
  },
  widgets: [
    {
      id: "hero-1",
      type: "hero",
      theme: "yellow",
      content: {
        subtitle: "Designing. Building. Learning. Improving.",
        title: "Hi, I'm Pravin Vegare.",
        emoji: "🖐️",
        description: "My goal is to contribute to the world through thoughtful technology, exceptional user experiences, and products that improve everyday life.",
        // Please ensure your uploaded image is named exactly "profile.png" or adjust this path
        image: "/profile.png"
      }
    },
    {
      id: "quote-1",
      type: "quote",
      theme: "dark",
      content: {
        text: "You've got to start with the <b>customer experience</b> and work backward to the technology.",
        author: "Steve Jobs"
      }
    },
    {
      id: "frameworks-1",
      type: "frameworks",
      theme: "coral",
      content: {
        title: "FrameworksBehind Our Thinking",
        items: [
          { label: "Leadership & Decision Making (Amazon)", url: "https://www.amazon.jobs/content/en/our-workplace/leadership-principles" },
          { label: "Customer Understanding (JTBD)", url: "https://strategyn.com/jobs-to-be-done/" },
          { label: "Execution & Learning (Lean Startup)", url: "https://theleanstartup.com/principles" }
        ]
      }
    },
    // {
    //   id: "projects-1",
    //   type: "projects",
    //   theme: "dark",
    //   content: {
    //     subtitle: "Case Studies__",
    //     title: "Projects Gallery",
    //     items: [
    //       {
    //         title: "Project Alpha",
    //         description: "An innovative platform combining AI with everyday task management.",
    //         image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    //         link: "#",
    //         tags: ["React", "TypeScript"]
    //       },
    //       {
    //         title: "Project Beta",
    //         description: "A seamless e-commerce experience tailored for modern digital storefronts.",
    //         image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80",
    //         link: "#",
    //         tags: ["Next.js", "Tailwind"]
    //       },
    //       {
    //         title: "Project Gamma",
    //         description: "A real-time data visualization dashboard for tracking remote servers.",
    //         image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    //         link: "#",
    //         tags: ["D3.js", "Analytics"]
    //       }
    //     ]
    //   }
    // },
    {
      id: "contact-1",
      type: "contact",
      theme: "white",
      content: {
        title: "Connect With Me__",
        description: "Send mail for projects related to software development and job opportunity",
        email: "pravinvegare123@gmail.com",
        greeting: "or just say hello"
      }
    },
    
    {
      id: "sustainability-1",
      type: "sustainability",
      theme: "yellow",
      content: {
        treeImage: "/tree.png",
        subtitle: "Plant Trees. Restore Nature. Secure the Future.",
        title: "Sustainability is Not a Choice; It's a Responsibility."
      }
    },{
      id: "footer-1",
      type: "footer",
      theme: "white",
      content: {
        name: "Pravin Vegare",
        email: "Pravinvegare123@gmail.com",
        social: "Linkedin",
        socialLink: "https://www.linkedin.com/in/pravinvegare/"
      }
    },
  ]
};
