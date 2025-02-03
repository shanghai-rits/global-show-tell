import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  detailImage: string;
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
      authors: 'Author A, Author B',
      description: 'This part is "description". Waiting for submission ~\n A festival curated from the eyes of animation artists, a screening journey to explore poetry and inspiration, with audience together we create a garden for our mind.',
      sections: {
        "How I use AI in this project": 
          `Waiting for submission\n` +
          `A festival curated from the eyes of animation artists, a screening journey to explore poetry andinspiration, with audience together we create a garden for our mind.\n\n` +
          `Feinaki Being Animation Week is an animation festival curated by the internationally well connectedChinese animation artists, researchers and curators who freguently travel between animation festivalsacross the world. The festival was established in 2019 and has been held 6 times by 2024.`,
        "Interactivity": 
          `Waiting for submission\n` +
          `A festival curated from the eyes of animation artists, a screening journey to explore poetry andinspiration, with audience together we create a garden for our mind.`,
        "My global learning story": 
          `Waiting for submission\n` +
          `A festival curated from the eyes of animation artists, a screening journey to explore poetry andinspiration, with audience together we create a garden for our mind.`,
        "Supplementary Information": 
          `Waiting for submission`
      },
      coverImage: '/showcase/1/cover.jpg',
      detailImage: '/showcase/1/cover.jpg'
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

        <div className="detail-image-container">
          <img
            src={item.detailImage}
            alt="Detail"
            className="detail-image"
          />
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
      <h2 className="section-title">{title}</h2>
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