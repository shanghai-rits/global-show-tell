import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './ShowcaseDetail.css';


interface ShowcaseItem {
  id: number;
  title: string;
  authors: string;
  description: string;
  sections: {
    [key: string]: string;
  };
  coverImage: string;
  detailImages: { src: string, width: number }[];
}

const ShowcaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/showcase');
    }
  };


  const items: ShowcaseItem[] = [
    {
      id: 1,
      title: 'Live Diffusion',
      authors: 'Chenxuan Wu, Jinran Ye',
      description: 'A real-time interactive AI-generated image system.',
      sections: {
        "How I use AI in this project":
          `The Live-Diffusion project focuses on developing a real-time interactive AI-generated image system. By leveraging sensor and camera data, the system dynamically responds to user interactions, enhancing creative expression through AI-generated imagery. Integrating platforms like TouchDesigner and ComfyUI, the project emphasizes real-time interactivity and customizability, aiming to create a more inclusive and intuitive environment for creators. The system's design allows for flexible user inputs and is intended to encourage broader participation in AI-driven creative processes.`,
        "Interactivity":
          `To realize real-time interactive AI image generation, the system shall:
  - Fetch data from user-self-defined hardware
  - Pass the data and input image to Diffusion models
  - Fetch the generated images
  - Display the generated images on the user interface
`,
        "My global learning story":
          `Accessibility and Inclusivity: The complexity and often technical nature of current AI art generation tools can be a barrier to entry for many potential creators. This includes those without a technical background or those who may not have access to advanced computing resources.
Limited Interactivity in AI Art: Existing AI-generated art systems largely operate on static inputs, such as textual prompts, which restrict the dynamic engagement between the creator and the creation process. This limitation stifles the potential for art that evolves in real-time in response to its environment or the audience's interactions.
`,
      },
      coverImage: '/showcase/1/cover.jpg',
      detailImages: [{ src: '/showcase/1/detail01.jpg', width: 900 }, { src: '/showcase/1/detail02.jpg', width: 900 }],
    },
  ];

  const item = items.find(i => i.id === Number(id));

  useEffect(() => {
    if (item) {
      document.title = item.title; // 设置当前 Showcase 项目的标题
    } else {
      document.title = "Showcase"; // 备用默认标题
    }
  }, [item]); // 依赖 item，确保切换 showcase 页面时更新


  if (!item) return <div>Work not found</div>;

  return (
    <div className="detail-container">
      <Navbar />
      <div className="hero-image-container">
        <img
          src={item.coverImage}
          alt={item.title}
          className="hero-image"
        />
      </div>

      {/* 内容容器 */}
      <div className="content-container">
        <div className="content-wrapper">
          {/* 固定标题部分 */}
          <h1 className="title1">{item.title}</h1>
          <p className="authors">{item.authors}</p>

          {/* 动态内容部分 */}
          <Section
            title="Description"
            content={item.description}
          />

          {Object.entries(item.sections).map(([sectionTitle, content]) => (
            <Section
              key={sectionTitle}
              title={sectionTitle}
              content={content}
            />
          ))}
        </div>

        {/* 详情图片 */}
        <div className="detail-image-container">
          {item.detailImages.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={`Detail ${index + 1}`}
              className="detail-image"
            />
          ))}
        </div>

        <button
          className="back-button"
          onClick={handleBack}
        >
          ← Back to Showcase
        </button>

      </div>
    </div>
  );
};

// 增强的Section组件
const Section: React.FC<{ title: string; content?: string }> = ({ title, content }) => {
  if (!content) return null;

  return (
    <div className="section">
      {title !== "Description" ? <h2 className="section-title">{title}</h2> : null}
      <div className="section-content">
        {content.split('\n').map((line, index) => (
          <p key={index} className="content-paragraph">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ShowcaseDetail;