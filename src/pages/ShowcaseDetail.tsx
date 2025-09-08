import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './ShowcaseDetail.css';


interface ShowcaseItem {
  id: number;
  title: string;
  authors: string;
  program: string;
  description: string;
  sections: {
    [key: string]: string;
  };
  coverImage: string;
  detailImages: { src: string, width: number }[];
  detailVideos?: { src: string, width: number }[];
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
      title: 'Live-Diffusion',
      authors: 'Chenxuan Sun, Jinran Ye',
      program: 'NYU Shanghai IMA',
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

We began the Live-Diffusion project in Abu Dhabi with Professor __Mang__, who provided valuable guidance on which AI models to use and how to connect ComfyUI with TouchDesigner. After returning to Shanghai, we worked on DURF, with advice from __Moon__ and __Leon__. We incorporated additional interactive features such as control knobs and sensors. Along the way, we participated in the IMA Gallery, hosted a Halloween Party, and showcased our work at the IMA final show.
`,
      },
      coverImage: '/showcase/1/cover.jpg',
      detailImages: [{ src: '/showcase/1/detail01.jpg', width: 900 }, { src: '/showcase/1/detail02.jpg', width: 900 }],
    },
    {
      id: 2,
      title: 'DreamyBot',
      authors: `Ruiqi Liu`,
      program: 'NYU Shanghai IMA',
      description: 'Customizes your perfect child via company website!',
      sections: {
        "How I use AI in this project":
          `DreamyBot is an interactive installation set in the background of 2080, where an AI company customizes perfect child robot that meets all customers' preferences. Customers can customize their own DreamyBot by visiting the company website. This project satirically explores a future which AI technology can be apply to human beings.

The user can customize their own DreamyBot within three stages:
1. Choose the basic information such as age and gender
2. Choose the appearance such as skin color, body height, etc.
3. Choose personality using MBTI as a reference, and input any skills they want their kid to have.

Then they get to preview the picture of their DreamyBot. Here the user can also get the AI real-time generated 3D model of their kid robot. The user can also chat with the kid to ensure the personality. `,
        "Interactivity":
          `DreamyBot interacts with users through a web-based customization system, allowing them to select appearance, personality, and skills for their AI-generated kid robot. It integrates with AI models like Stable Diffusion for visual generation and ChatGPT API for interactive dialogue. Besides, the project has a company video that simulate the company promo and helps the audience to better understand the project.
`,
        "My global learning story":
          `My project was inspired by the NYU Shanghai 2023 Exclusive speaker series with the China CEO of Groove X - a Japanese company who make pet robots. When I saw the promo of LOVOT, which is the customized AI pet robot that use 3 months to slowly learn their owner's preferences. They are ""perfect"" -- never cause allergy, never pee anywhere, and they don't even need to be fed...... I couldn't stop thinking, if one day this is applied on human being for customizing a friend, a lover, or even a child. 
I happened to be at Professor Gottfried Haider's class ""Machine Learning for Artists and Designers"" then, and I made this project with his help in finding, embedding the applicable model to the website.`,
        "Supplementary Information": `https://ruiqiliu.net/dreamybot
The first time I showed this project was on 2023 Fall IMA show, I bought two customized "DreamyBot" company hoodies and completely pretended to be the pop-up sale lady standing and promoting for "my company" at the show. Surprisingly a lot of people asked me if that was a real pop up sale at IMA show! `
      },
      coverImage: '/showcase/2/cover.jpg',
      detailImages: [
        { src: '/showcase/2/1.JPG', width: 800 },
        { src: '/showcase/2/2.JPG', width: 800 },
        { src: '/showcase/2/3.JPG', width: 800 },
        { src: '/showcase/2/4.JPG', width: 800 },
        { src: '/showcase/2/5.JPG', width: 800 },
        { src: '/showcase/2/6.JPG', width: 800 },
      ],
      // detailVideos: [{ src: '/showcase/2/video1.mov', width: 900 }],
      detailVideos: [{ src: 'https://drive.google.com/file/d/1ELMm-PiHdMDVzpshKGiNY1iqiG-yq6vT/preview', width: 300 }],
    },
    {
      id: 3,
      title: 'KUNST KAPUTT',
      authors: `Senaida Ng, Brian Ho, Dadabots`,
      program: 'NYU IMA Low Res',
      description: 'A generative AI-powered music ecosystem.',
      sections: {
        "How I use AI in this project":
          `Realized as an immersive web experience that explores how generative AI can be used to create new ecosystems for music creation and profit-sharing using raw audio neural networks.`,
        "Interactivity":
          `Traditionally, remix albums are curated by an artist or artist’s team, to feature unique collaborations and new perspectives on an existing track/song. For this project, anyone is able to create their own mix of these original tracks using generative AI and release it on Metalabel, a profit-sharing distribution platform.`,
        "My global learning story":
          `I initially learned about generative music in the "Code of Music" class with Luisa Perrera while I was an undergraduate at NYU IMA. I was interested in breaking traditional music distribution methods as my frustration towards the music streaming economy grew. In 2022, I encountered Dadabots and their work through Portrait XO, a researcher and AI artist who came to give a talk at NYU Berlin's Clive Davis Institute program. I was fascinated by the idea of infinitely generating tracks and later connected with CJ Carr from Dadabots at the New Visions for Music and Sound Conference, where we were on a panel discussing generative AI. The production of this project was deeply inspired by my global study abroad experience in Berlin, and becoming immersed in live experimental electronic music for the first time at Atonal Festival. I fell in love with the rich culture, architecture and history of Berlin, which influenced the sounds and aesthetic of the album. `,
        "Supplementary Information": `https://www.kunstkaputt.world/
The Manifesto
ART IS NOT BROKEN
With the advancement of generative AI technology in music, artists and creatives are faced with new challenges and opportunities in content creation and consumption which translates into new possibilities of interaction and monetization. KUNST KAPUTT is a generative, collaborative album that explores how generative AI tools can be used to create new ecosystems for music creation and profit-sharing.

WHAT IS KUNST KAPUTT?
This is an experimental project created by artist and producer, SENAIDA, to invite audiences to be a part of the output of this album. Traditionally, remix albums are curated by an artist or artist’s team, to feature unique collaborations and new perspectives on an existing track/song. For this project, anyone is able to create their own mix of these original tracks using generative AI and release it on the blockchain. As we believe that strengthening communities and achieving equity is the key to building a new music economy, creators will split the profits 50-50 with the original artist, and retain ownership of their creations.

WHY IS THIS IMPORTANT?
The music streaming economy is broken, with most artists making mere fractions of a penny for their art so we want to explore new ways in which music can be distributed in a fun and collaborative way. By using music game theory, we encourage the collaboration of AI and humans working together to merge technical capabilities with human aesthetic judgment to create unique musical experiences. We believe that making music should not be limited to those who are privileged, and instead should promote community-based worldbuilding and diverse perspectives.

WHAT DO WE HOPE TO ACHIEVE?
We believe that AI is not something that artists and creatives should fear, but rather as a tool for achieving our own creative potentials. We do not believe that AI will replace music creators because the core of music as an expression is innately human, dating back to the Prehistoric Eras. We hope to demonstrate that music streaming and consumption is no longer limited to the major streaming platforms, which value capital over artistry and technology over people. We acknowledge that this is still a nascent field, and that this project is not perfect, but we hope that it sparks some inspiration in other artists to think critically about their use of technology and how the distribution of their work contributes towards their goals and values.`,
      },
      coverImage: '/showcase/3/cover.jpg',
      detailImages: [
        { src: '/showcase/3/1.png', width: 800 },
        { src: '/showcase/3/2.png', width: 800 },
        { src: '/showcase/3/3.png', width: 800 },
        { src: '/showcase/3/4.png', width: 800 },
      ],
      detailVideos: [{ src: 'https://drive.google.com/file/d/1uCJM3Ju77UzJ0GKaZzCpTPC5KrwqAVeM/preview', width: 550 },
      { src: 'https://drive.google.com/file/d/1D_VjeJqzvhTC71_6rgm5vD6bW_W4aZMY/preview', width: 550 },
      { src: 'https://drive.google.com/file/d/1w4rRfpiNhycOEa1B-2SMoeK15248HS0a/preview', width: 550 },
      ],
    },
    {
      id: 4,
      title: 'Digital Genesis',
      authors: `Yanrui Shao and Jiayue Qiu`,
      program: 'NYU Shanghai IMA',
      description: 'This project delves into the exploration of life by using AI to simulate the behaviors of real organisms. It challenges the traditional boundaries between biological and digital realms, inviting audiences to question: Can life be defined purely by behavior? Could digital organisms represent a new form of life?',
      sections: {
        "How I use AI in this project":
          `Our project incorporates AI through neuroevolution, a machine learning approach that combines genetic algorithms with neural networks. By simulating natural selection, the system continuously refines its neural network, creating an ever-evolving, responsive digital entity.`,
        "Interactivity":
          `Our project explores the dynamic relationship between digital and biological life by creating a digital life form that observes and mimics evolutionary behaviors found in nature. It interacts directly with biological organisms, learning from their survival strategies and adapting over time.

For example, just as eels instinctively try to consume larger prey, the digital mouse in our system learns to ""click"" on folders in a similar way. Likewise, just as fish avoid sharks to escape being hunted, the mouse adapts to avoid computer viruses using comparable survival tactics. Through this evolving interaction, our project bridges the gap between digital intelligence and biological instincts, demonstrating how life—both virtual and real—can evolve through adaptation and learning.`,
        "My global learning story":
          `Our project was deeply inspired by Nature of Code by Daniel Shiffman, particularly the chapters on genetic algorithms and neural networks. We were especially excited about the intersection of these concepts in neuroevolution, where machine learning takes on an evolutionary approach—training neural networks through generations of trial and error.

Within the NYU global network, our biggest source of support came from our class Machine Learning for Artists and Designers at NYU Shanghai's IMA program, taught by Professor Gottfried Haider. His guidance was invaluable in helping us refine both the conceptual framework and technical implementation of our project. Through his mentorship and the collaborative learning environment of the class, we were able to explore the creative possibilities of machine learning in new and meaningful ways.`,
        "Supplementary Information": `Video: https://www.youtube.com/watch?v=jByiWqJBiQk&t=3s
Code (well-trained version): https://editor.p5js.org/lindashao1220/sketches/v8odc0gwf`,
      },
      coverImage: '/showcase/4/cover.jpg',
      detailImages: [
        { src: '/showcase/4/1.jpg', width: 800 },
      ],
    },
    {
      id: 5,
      title: 'Dear Diary',
      authors: `Yingfan Chen`,
      program: 'NYU Shanghai IMA',
      description: '"Dear Diary" prints out diary entries generated by a fine-tuned large language model, based on participants’ emotions and their intensity. The project provides a resonator for participants’ emotions, yet questioning the role of AI in shaping self identity through narration. ',
      sections: {
        "How I use AI in this project":
          `The texts that the printer prints out are generated by a GPT 4o model fine-tuned with diary entries I wrote. Each text produced by the Large Language model presents a unique narration, sounds like what I might write, incorporates my experience, but is never one of my days. `,
        "Interactivity":
          `The project board features six emotional zones: Happy, Confused, Fearful, Excited, Stressful, and ??? (emotion with question marks). Participants place stones in the different emotional zones, with the weight of the stones in each zone representing the intensity of that emotions in their heart. The printer prints out diary entries every 30 seconds based on the emotion inputs on the board, producing texts that mirror what I might write under those emotional intensities.`,
        "My global learning story":
          `I built Dear Diary in Fall 2024, as the final project for the Machine Learning for Artists and Designers class. Professor Gottfried Haider, as the instructor of the class, expands my thinking in combining AI with different media. He trusts me in coming up a good projects idea, when I felt anxious in finding what I want to build. He also offers great technical support. What felt out of my reach became achievable under his guidance. 

The idea of connecting diary and emotions seeded after an office hour with Professor Junnan Chen. She patiently and gently listened to my messy thoughts, pointing out the threads that connect all my interest. From Narration to identity, from emotion to body representation, she reveals to me the power of theories. 

I learned how to form a project idea from Professor Sharon De La Cruz, who taught Design for Curiosity Portals in Spring 2023 while I studied away in New York. She said, catch the excitement, then think about what might be the things that draw you in that idea. She inspires me to follow my curiosity and create."`,
        "Supplementary Information": `Video: https://youtu.be/HSOL0H_Sr4I?si=vE_9GauRiizyUKNq`,
      },
      coverImage: '/showcase/5/cover.jpg',
      detailImages: [
        { src: '/showcase/5/1.jpg', width: 800 },
        { src: '/showcase/5/2.jpg', width: 800 },
        { src: '/showcase/5/3.jpg', width: 800 },
        { src: '/showcase/5/4.jpg', width: 800 },
        { src: '/showcase/5/5.JPG', width: 800 },
        { src: '/showcase/5/6.jpg', width: 800 },
      ]
    },
    {
      id: 6,
      title: 'The Silhouette',
      authors: `Lizhemei (Riva) Wang & Chenyi Wang`,
      program: 'NYU Tandon ID&M',
      description: `The essence of our belonging subtly shifts, yet remains tethered to the earth beneath our feet. 
As international students, we share the common experience of relocating to foreign countries in pursuit of varied goals, which gradually blurs our notion of "home." Our sense of belonging evolves as we mature and live in different places. Intriguingly, despite vast cultural differences, we find a universal sense of belonging in nature.
In this installation, my partner Chenyi and I aim to capture the dynamic changes in nature using a blend of sound, visuals, and sculpture. By employing techniques in sound making, physical computing, painting, and AI tools, we strive to provide an immersive experience that allows the audience to feel the tranquility of nature amidst the changing seasons.  `,
      sections: {
        "How I use AI in this project":
          `AI tools are used in the process of creating images and videos to project on the fabrics.`,
        "Interactivity":
          `The projection videos are made using AI tools to transform original painting and our preferred artistic style into separate videos.`,
        "My global learning story":
          `We are encouraged by our classmates and professors to create a tangible installation for better audience engagement, rather than something purely digital.`,
        "Supplementary Information": `https://rivawang.cargo.site/silhouette-of-life`,
      },
      coverImage: '/showcase/6/cover.jpg',
      detailImages: [
        { src: '/showcase/6/1.png', width: 800 },
      ],
      detailVideos: [
        { src: 'https://drive.google.com/file/d/1t4xe5KkzITTareNoHefE4ntKVDroqS0E/preview', width: 900 },
        { src: 'https://drive.google.com/file/d/1ymz2HHzEDNMbWaPwlzqs30Unr8AHD8FJ/preview', width: 900 },
        { src: 'https://drive.google.com/file/d/1HkhAmM_0wSE5DDnlkt49uH3wCw-eOZFz/preview', width: 900 },
        { src: 'https://drive.google.com/file/d/1-zRsmUhN7u9pN2ztLmKCrKBb9nT0KU2o/preview', width: 900 },
        { src: 'https://drive.google.com/file/d/1mWq4HQbWMrcD-Ytbu-yR7LXqx2BNHdab/preview', width: 900 },
      ],
    },
    {
      id: 7,
      title: 'A Tale of Two Lives',
      authors: `Danni Wang`,
      program: 'NYU IMA Low Res',
      description: 'A Tale of Two Lives establishes a connected platform for intimate communication between humans and aquatic plants, imagining humans as symbiotic with the microscopic inhabitants of the rhizosphere. The project implies an interrogation of eco-evolutionary consciousness in which respiration encapsulates our relationship with nature, from single-celled life forms to the controversial Anthropocene, while elaborating that light lies at the basis of all lives.',
      sections: {
        "How I use AI in this project":
          `Through machine learning algorithms, AI processes environmental signals and biological data to generate responsive feedback, allowing for a dynamic exchange that deepens human understanding of plant behaviors and their ecological roles. By doing so, AI acts as a mediator that enhances the symbiotic communication.`,
        "Interactivity":
          `The project interacts with elements like water, lighting, and breeze, creating a blend of natural and simulated environments that enhance biophilic connections. Participants are invited to breathe with aquatic plant roots, facilitated by a CO2 detector underwater that changes color based on CO2 levels, triggering participant interaction to restore balance.`,
        "My global learning story":
          `In 2021-2022, the NYU Global Network was instrumental in the development of 'A Tale of Two Lives.' Interactions with NYU New York, NYU Berlin, and NYU Shanghai through the NYU IMA Low Residency program offered valuable support and inspiration. This collaborative environment and access to global resources allowed me to explore innovative approaches and enrich my project with diverse, cross-cultural insights.`,
        "Supplementary Information": `Video: https://www.youtube.com/watch?v=yitrzUpIYq4`,
      },
      coverImage: '/showcase/7/cover.jpg',
      detailImages: [
        { src: '/showcase/7/1.jpg', width: 800 },
        { src: '/showcase/7/2.jpg', width: 800 },
        { src: '/showcase/7/3.jpg', width: 800 },
        { src: '/showcase/7/4.jpg', width: 800 },
        { src: '/showcase/7/5.jpg', width: 800 },
        { src: '/showcase/7/6.jpg', width: 800 },
      ]
    },
    {
      id: 8,
      title: 'Poespin - Wherever your body reach, there is a poetry',
      authors: `Cory Yihua Li - Director,AI Writting System,CGI
Baiyuan Xin - Photo&Video Documentation (NYU ITP)
Cardin An Chung (USC Thornton) - Music & Sound Design
Wendy Li - Poet on the pole, Choreographer
Jiayi Li - Animator, Rigging, Cloth Design)
Archy Hongyue Cheng (Universität Freiburg English Literatures and Literary Theory) - English Literature&Poetry Consultant)
Reraner Yetong Xin (Harvard GSD) - Curator,Art Director,3D Art CGI)
Armon Naeini - Creative Technologist / TouchDesigner Coder`,
      program: `NYU Tisch ITP/IMA`,
      description: `PoeSpin (Poet+Spin) is a human-AI co-creating writing system and installation that transforms dance movements into poetry. Using machine learning techniques, we tokenize W.B. Yeats' poetry into a 2D interface for users to explore. It aims to liberate the human body from body shaming and to ‘let the dancer speak’—in Yeats' words.`,
      sections: {
        "How I use AI in this project":
          `PoeSpin is a human-AI cocreating writting system that transforms ‘pole dancing’ movements into poetry, blending Eastern and Western artistic traditions. Our project uses three innovative approaches:

1. AI-driven poetry composition inspired by dance, incorporating the circular Chinese “Lianhuanshi” (连环诗) form / “Chinese ring poetry” to reflect pole-dance’s rotational nature.
2. The reduction of the dimensions of word vectors creating the space for dancers to experiment with ‘automatic writting’.
3. The expansion of the dimensions of the captured body movement as an exploration of semantic meanings

By fusing W. B. Yeats’ poetry and Chinese poetic structures, PoleSpin creates a unique narrative that bridges cultures. It reimagines dance as a universal expression, and is projected into verses, which embodies both physical grace and cultural heritage.

This is also the 1st ‘dance to poetry’ art project to interpret pole dance through computational linguistic perspective.`,
        "Interactivity":
          `How It Works:
      https://docs.google.com/document/d/13ps0ZEs2GGQi9t2c_GL2-Cmc21Rc_L913O0dXAHCHAs/edit?usp=sharing
      Your body is the key to unlocking the poetic landscape on this 2D interface. As you move, your limb positions are tracked in real time, creating trails that influence the poetic words displayed on the screen.
      The interface is divided into four quadrants:
      X-axis: Represents the emotion of words.
      Move right (+X): Explore positive emotions (joy, love, excitement).
      Move left (-X): Explore negative emotions (sorrow, anger, melancholy).
      Y-axis: Represents the abstraction level of words.
      Move up (+Y): Discover abstract words (concepts, ideas, metaphors).
      Move down (-Y): Encounter concrete words (physical objects, tangible imagery).
      Instructions
      Step in front of the camera: The system uses MediaPipe to track your body movements.
      Move your body to explore:
      Extend your arms, twist, or step to different positions to guide the poetic flow.
      Move horizontally (left/right) to shift the emotional tone of words.
      Move vertically (up/down) to explore words that range from abstract to concrete meanings.
      Observe the trails: Your body’s movement leaves a visible trail, reflecting your influence on the poetic output.
      Interact and experiment: Dance, pause, or transition slowly—your movements shape the narrative.
      Create your own poetry: The more you explore, the more unique combinations of words you unlock.
`,
        "My global learning story":
          `My friend Wendy Li (pole dancer in poespin) and our professor Allison Parrish`,
        "Supplementary Information": `https://coryleeart.com/Poespin-Wherever-your-body-reach-there-is-a-poetry
This project is actively looking for potential funding for support the artist who got involved`,
      },
      coverImage: '/showcase/8/cover.jpg',
      detailImages: [
        { src: '/showcase/8/1.png', width: 800 },
        { src: '/showcase/8/2.png', width: 800 },
        { src: '/showcase/8/3.png', width: 800 },
        { src: '/showcase/8/4.png', width: 800 },
        { src: '/showcase/8/5.png', width: 800 },
        { src: '/showcase/8/6.png', width: 800 },
        { src: '/showcase/8/7.png', width: 800 },
        { src: '/showcase/8/8.png', width: 800 },
        { src: '/showcase/8/9.png', width: 800 },
        { src: '/showcase/8/10.png', width: 800 },
        { src: '/showcase/8/11.png', width: 800 },
        { src: '/showcase/8/12.png', width: 800 },
        { src: '/showcase/8/13.png', width: 800 },
        { src: '/showcase/8/14.png', width: 800 },
      ]
    },
    {
      id: 9,
      title: 'Arrival',
      authors: `Jiaqi Yi`,
      program: 'NYU Tisch ITP/IMA',
      description: `This is an interactive webpage as a recreation of the movie ""Arrival"". Here users can talk to the alien behind the screen like what they do in the movie. 
      
The unique ink styled language shows the response from the alien. AI translation is accompanied.`,
      sections: {
        "How I use AI in this project":
          `I used AI as "translation" for the conversation with the alien. The language of the aliens are hardcoded with the parameters of the user input, making it mysterious. AI's role here makes the figure of the alien more vivid and interesting.`,
        "Interactivity":
          `Users can talk to the alien by typing their messages or choose the questions in the example bar. Aliens will reply with their own unique language and will be translated.`,
        "My global learning story":
          `The original movie "Arrival". It is a very interesting narrative about how people firstly meet the aliens in the condition that they barely understand each other.`,
        "Supplementary Information": `https://whyjq.com/arrival/
The introduction and entry point to the project: https://whyjq.com/?code=4001"`,
      },
      coverImage: '/showcase/9/cover.jpg',
      detailImages: [
        { src: '/showcase/9/1.png', width: 800 },
      ]
    },
    {
      id: 10,
      title: 'GeneLight: A Dialogue Between Light and Imagination',
      authors: `Tatsan Chen`,
      program: 'NYU Tandon ID&M',
      description: `GeneLight is a generative lighting tool that transforms natural language into real-time lighting designs. It bridges creativity and technology, helping users understand and communicate lighting ideas more effectively.`,
      sections: {
        "How I use AI in this project":
          `GeneLight integrates AI by using large language model to interpret natural language scene descriptions and generate lighting parameters such as brightness, color, and beam angle. These parameters are transmitted via OSC to Unreal Engine, enabling users—especially those without technical lighting knowledge—to instantly visualize and refine their ideas. AI becomes not just a translator, but a co-designer.`,
        "Interactivity":
          `GeneLight is built on two core interactions.

First, it interacts with Unreal Engine to deliver realistic, real-time lighting previews. This creates a highly accurate visual simulation that other software rarely achieves.

Second, it interacts with the user’s natural language input. A user can describe a scene—for example, “a sunset scene”—and GeneLight will interpret that input to generate specific lighting parameters, such as:

Front dim 80 color 255 120 80 zoom 40
Back dim 60 color 200 100 50 zoom 30

These two systems create a feedback loop where users—regardless of technical background—can design, experiment, and communicate lighting ideas more intuitively than ever before.`,
        "My global learning story":
          `This project was supported by the Integrated Design & Media (IDM) program at NYU Tandon, where I explored the intersection of performance, technology, and interaction design. Special thanks to Professor Scott Fitzgerald, whose feedback and guidance helped me shape the conceptual and technical direction of GeneLight. `,
        "Supplementary Information": `Videos:
https://www.youtube.com/watch?v=nS5OyRWQKOs
https://www.youtube.com/watch?v=iIEAPr1ie-M`,
      },
      coverImage: '/showcase/10/cover.jpg',
      detailImages: [
        { src: '/showcase/10/1.png', width: 800 },
        { src: '/showcase/10/2.png', width: 800 },
        { src: '/showcase/10/3.png', width: 800 },
        { src: '/showcase/10/4.png', width: 800 },
        { src: '/showcase/10/5.png', width: 800 },
        { src: '/showcase/10/6.png', width: 800 },
        { src: '/showcase/10/7.png', width: 800 },
        { src: '/showcase/10/8.png', width: 800 },
        { src: '/showcase/10/9.png', width: 800 },
      ]
    },
    {
      id: 11,
      title: 'Lingo Bud',
      authors: `Jiahui(Georgia) Chen, Chenxu (Cathy) Li, Will Park`,
      program: 'NYU Tisch ITP/IMA',
      description: `Lingo Bud is your friendly, AI-powered companion, designed to make language learning intuitive and engaging by fostering real-time feedback and meaningful connections.`,
      sections: {
        "How I use AI in this project":
          `Lingo Bud is built on a deeply integrated AI framework that drives both the personality and functionality of the experience. We use OpenAI’s language model to generate dynamic, in-character responses from our learning avatars, personalized study plans from our centre tree, and emotionally expressive conversations that evolve over time. The prompts are carefully structured and parsed using regex to ensure precision and consistency. In addition, we leverage Azure’s Speech Services for real-time speech-to-text processing, and Unity’s Voice SDK to create a responsive, voice-first interface. The result is a seamless, interactive XR environment where learners practice speaking a new language with AI-powered companions who learn and grow with them.`,
        "Interactivity":
          `Lingo Bud interacts with users through voice, gesture, and spatial awareness in mixed reality. Users speak directly with AI-generated avatars who respond in real time, using natural language and expressive animations. These avatars are aware of their environment and can be placed, moved, and interacted with within the user’s real space using Meta’s XR tools. The project also interfaces with a central “Mother Tree” who listens to your goals and curates a learning plan by growing seeds that spawn new learning buddies. Each interaction — whether it’s with a Grammar Buddy, Vocab Buddy, or Conversation Buddy — is tailored to create a playful and supportive language immersion experience, all within your own physical environment.`,
        "My global learning story":
          `This project was brought to life with the support and inspiration we found at NYU’s Interactive Telecommunications Program (ITP). Being part of such a diverse and global student body opened our eyes to the shared challenges we face in language learning — from hesitation in speaking to the lack of immersive environments. Our classmates’ openness to experimentation and collaboration encouraged us to push the boundaries of how AI and XR can be used together. This spirit of playful innovation and global perspective was essential to the development of LingoBud, and we’re grateful to be building in such a dynamic and supportive environment.`,
        "Supplementary Information": `https://www.youtube.com/watch?v=kYrCgasTE7o&ab_channel=CathyLi`,
      },
      coverImage: '/showcase/11/cover.jpg',
      detailImages: [
        { src: '/showcase/11/1.png', width: 800 },
        { src: '/showcase/11/2.png', width: 800 },
        { src: '/showcase/11/3.png', width: 800 },
        { src: '/showcase/11/4.png', width: 800 },
        { src: '/showcase/11/5.png', width: 800 },
        { src: '/showcase/11/cover.jpg', width: 800 },
      ]
    },
    {
      id: 12,
      title: 'The Theater',
      authors: `John Luo`,
      program: 'NYU Tisch ITP/IMA',
      description: `The Theater is a VR interactive theatre play project, blends traditional Chinese theatre aesthetics with modern machinery design, showcasing the mix of modern performance and advanced mocap technology and experimental VR interactive methods, to explore themes of individualism and collectivism.`,
      sections: {
        "How I use AI in this project":
          `In "The Theater", AI plays a key role in shaping its surreal and uncanny aesthetic. It is used in the early development stage for concept art generation, helping to explore visual ideas. AI also generates 3D models, introducing unexpected and wild elements that enhance the project's dreamlike quality. Additionally, it is employed for narrator voice generation, creating an eerie, almost-human tone that deepens the immersive experience.`,
        "Interactivity":
          `"The Theater" interacts with players through advanced AI motion capture and finger-tracking technology, enabling controller-free engagement. It responds to players' movements and gestures, allowing them to actively shape performances within two contrasting virtual worlds—one representing Eastern collectivism and the other Western individualism. By blending traditional Chinese theatre aesthetics with modern machinery design, the project creates a dynamic, interactive stage where participants influence the narrative and explore their role within these cultural frameworks.`,
        "My global learning story":
          `In late 2023, NYU Shanghai's Fall Dance Concert, "Passage", inspired me with its dynamic fusion of traditional and contemporary movement, reflecting themes of transformation and cultural interplay. The performance’s exploration of transition deeply resonated with my project, *The Theater*, reinforcing my approach to blending traditional Chinese aesthetics with modern interactive technology. After experiencing the concert through the NYU global network, I actively sought collaboration with performance artists to further integrate movement into my work. This pursuit led me to Yingru Huang, whose artistic vision aligned with mine, and she later became the head choreographer and co-director of the project.`,
        "Supplementary Information": `https://johnlol.net/the-theater
https://docs.google.com/document/d/1MNkP3lbcBaWSuZSA8K-SDMucPkkoVoyyk0FtYGc9J6U/edit?usp=sharing`,
      },
      coverImage: '/showcase/12/cover.jpg',
      detailImages: [
        { src: '/showcase/12/3.jpg', width: 800 },
        { src: '/showcase/12/8.jpg', width: 800 },
        { src: '/showcase/12/1.jpg', width: 800 },
        { src: '/showcase/12/4.jpg', width: 800 },
        { src: '/showcase/12/5.jpg', width: 800 },
        { src: '/showcase/12/6.jpg', width: 800 },
        { src: '/showcase/12/7.jpg', width: 800 },
        { src: '/showcase/12/2.jpg', width: 800 },
        { src: '/showcase/12/9.jpg', width: 800 },
        { src: '/showcase/12/10.jpg', width: 800 },
        { src: '/showcase/12/11.jpg', width: 800 },
        { src: '/showcase/12/12.jpg', width: 800 },
        { src: '/showcase/12/13.jpg', width: 800 },
        { src: '/showcase/12/14.jpg', width: 800 },
        { src: '/showcase/12/15.jpg', width: 800 },
        { src: '/showcase/12/16.jpg', width: 800 },
        { src: '/showcase/12/17.jpg', width: 800 },
        { src: '/showcase/12/18.jpg', width: 800 },
        { src: '/showcase/12/19.jpg', width: 800 },
        { src: '/showcase/12/20.jpg', width: 800 },
        { src: '/showcase/12/21.jpg', width: 800 },
      ]
    },
    {
      id: 13,
      title: 'Memourn',
      authors: `Jiachen Zhou`,
      program: 'NYU Tisch ITP/IMA',
      description: `Memourn is a 2.5D isometric narrative game that follows Adrian, a man who loses everything in a mysterious explosion and embarks on a journey through a cyberpunk city to recover his memories and uncover the truth. All interactions are driven by AI NPCs with autonomous agency — they evolve unique personalities based on player commands, offering conflicting perspectives, questioning motives, and even rebelling to break the fourth wall. As players navigate this psychological maze, they are drawn into a multilayered dialogue between memory, guilt, and the blurred boundaries between human and machine.`,
      sections: {
        "How I use AI in this project":
          `In Memourn, AI is not just a supporting tool — it is the central medium of interaction. All gameplay actions, from movement and dialogue to object manipulation and memory exploration, are mediated through an AI-driven natural language system. Each AI NPC evolves a unique personality based on the player's input, dynamically adapting to choices and forming complex responses, including moments of rebellion or emotional pushback. This agency allows the AI to break the fourth wall, challenge the player’s assumptions, and drive a narrative shaped by memory, trauma, and shifting identity. The AI doesn’t merely react — it transforms with the story, making every playthrough a distinct psychological journey.`,
        "Interactivity":
          `Memourn interacts with players through natural language input, allowing them to control the character and influence the world by communicating with AI-driven NPCs. These NPCs respond dynamically, evolve unique personalities, and sometimes challenge or resist the player’s actions. The game also interacts with environmental objects and memory fragments, which respond differently based on past choices, creating a layered, non-linear narrative experience.`,
        "My global learning story":
          `Memourn was deeply inspired and supported by the NYU Tisch ITP community. In Spring 2024, I took Professor Lobser’s elective Therapeutic VR, where we explored how Stable Diffusion could generate real-time, healing visuals based on user-defined inputs. This sparked my interest in the integration of AI within game engines. At the same time, Professor Clara’s Narrative Game Studio provided a comprehensive framework for designing narrative games, which drew me further into the possibilities of AI-driven storytelling. Throughout the development of this project, I had many meaningful conversations with ITP faculty and peers, whose insights and encouragement played a crucial role. In particular, during Fall 2024, Professor Simone Salvo’s class Medium of Memory helped me solidify the core narrative structure of Memourn and clarified how AI could function as a narrative agent. I’m especially grateful for the supportive, collaborative spirit of the ITP community, which made this project possible.`,
        "Supplementary Information": `https://vimeo.com/1070886878`,
      },
      coverImage: '/showcase/13/cover.jpg',
      detailImages: [
        { src: '/showcase/13/1.png', width: 800 },
      ]
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
          <div className="authors">{item.authors}</div>
          <div className="program">{item.program}</div>

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
        {/* Video section - add this before the image section */}
        {item.detailVideos && item.detailVideos.length > 0 && (
          <div className="detail-video-container">
            {item.detailVideos.map((video, index) => {
              // Check if the source is a Google Drive link
              const isGoogleDriveLink = video.src.includes('drive.google.com');

              return isGoogleDriveLink ? (
                <iframe
                  key={index}
                  src={video.src}
                  width={video.width}
                  className="detail-video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={`Video ${index + 1}`}
                ></iframe>
              ) : (
                <video
                  key={index}
                  src={video.src}
                  controls
                  width={video.width}
                  className="detail-video"
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              );
            })}
          </div>
        )}

        {/* 详情图片 */}
        <div className="detail-image-container">
          {item.detailImages.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={`Detail ${index + 1}`}
              className={`detail-image ${index < 2 ? 'full-width' : 'half-width'}`}
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

  const replacements = [
    {
      placeholder: '__Mang__',
      linkText: 'Mang',
      url: 'https://nyuad.nyu.edu/en/academics/divisions/arts-and-humanities/faculty/michael-ang.html',
    },
    {
      placeholder: '__Moon__',
      linkText: 'Moon',
      url: 'https://shanghai.nyu.edu/academics/faculty/directory/jung-hyun-moon',
    },
    {
      placeholder: '__Leon__',
      linkText: 'Leon',
      url: 'https://leoneckert.com/',
    },
  ];

  // Create a regex to match any of the replacement placeholders
  const regex = new RegExp(`(${replacements.map(r => r.placeholder).join('|')})`, 'g');

  // Split the content by the placeholders while preserving the placeholders in the resulting array
  const parts = content.split(regex);

  // Map over parts and replace any placeholder match with corresponding link element.
  const renderedContent = parts.map((part, index) => {
    // Check if the current part matches any replacement placeholder
    const rep = replacements.find(r => r.placeholder === part);
    if (rep) {
      return (
        <a
          key={`link-${index}`}
          href={rep.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {rep.linkText}
        </a>
      );
    }
    // Otherwise, split by newlines so they show as separate lines
    return part.split('\n').map((line, idx, arr) => (
      <React.Fragment key={`${index}-${idx}`}>
        {line}
        {idx < arr.length - 1 && <br />}
      </React.Fragment>
    ));
  });

  return (
    <div className="section">
      {title !== "Description" && <h2 className="section-title">{title}</h2>}
      <div className="section-content">
        {renderedContent}
      </div>
    </div>
  );
};

export default ShowcaseDetail;