import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar/Navbar';

const OpenCallPage: React.FC = () => {
  console.log('OpenCallPage rendered');
  // This state replaces Vue’s "classActive" ref.
  const [classActive, setClassActive] = useState<boolean>(true);

  useEffect(() => {
    // rem auto-calculation (same as the original script)
    const docEl = document.documentElement;
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    const recalc = () => {
      const clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 720) + 'px';
    };

    window.addEventListener(resizeEvt, recalc, false);
    // Call recalc immediately (DOMContentLoaded has likely already fired)
    recalc();

    return () => {
      window.removeEventListener(resizeEvt, recalc, false);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Helmet>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/inter-ui/inter.css" />
        <title>open call</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        {/* Inline styles converted from your original <style> tag */}
        <style>{`
          * {
              padding: 0;
              margin: 0;
          }
          body {
              font-family: 'Inter', sans-serif;
              color: #333;
          }
          .page-body {
              width: 100%;
          }
          .li-box {
              height: 610px;
              width: 100%;
              position: relative;
              z-index: 1;
          }
          .zhuti {
              height: 600px;
              margin: 0;
              position: relative;
          }
          .shadow-title {
              position: sticky;
              z-index: -1;
              left: 20px;
              top: 0;
              color: #000;
          }
          .title-text-bg {
              background: url('/opencall/assets/title-text.png');
              width: calc(942px / 2);
              height: calc(545px / 2);
              background-size: 100% 100%;
          }
          .center-box {
              height: 300px;
              margin-top: -60px;
              position: relative;
              z-index: 1;
          }
          .img-bg {
              background: url('/opencall/assets/head-bg-all.png') no-repeat;
              width: 100%;
              height: 310px;
              background-size: cover;
          }
          .on-shadow-title-box {
              position: absolute;
              z-index: 3;
              top: 0;
              left: 0;
              width: 100%;
              height: 600px;
              pointer-events: none;
          }
          .on-shadow-title-bg {
              position: sticky;
              z-index: -1;
              left: 0;
              top: 0;
              background: url('/opencall/assets/title-shadow.png');
              width: calc(971px / 2);
              height: calc(531px / 2);
              background-size: 100% 100%;
          }
          .content {
              position: relative;
              top: 0;
              left: 0;
              right: 0;
              margin: 0 auto;
              margin-bottom: 150px;
              font-family: 'Inter', sans-serif;
          }
          ::-webkit-scrollbar {
              width: 0px;
          }
          .tab-box {
              padding: 20px 63px;
              max-width: 1414px;
              margin: 0 auto;
              display: flex;
              gap: 20px;
          }
          .tab-item {
              padding: 0 40px;
              height: 57px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2px solid rgba(0, 0, 0, 1);
              color: #000;
              border-radius: 50px;
              cursor: pointer;
              white-space: nowrap;
              flex: 0;
              font-size: 32px;
              text-align: center;
              font-family: 'Inter', sans-serif;
          }
          .tab-box .active {
              animation: active 0.75s forwards linear;
          }
          .tab-box .normal {
              animation: noActive 0.75s forwards linear;
          }
          .paragraph-box {
              padding: 12px 63px;
              max-width: 1414px;
              display: block;
              margin: 0 auto;
              font-size: 20px;
          }
          .paragraph-box p {
              margin-bottom: 20px;
              font-size: 20px;
              font-family: 'Inter', sans-serif;
              line-height: 1.3;
          }
          .group-class {
              margin-bottom: 20px;
          }
          .group-class p {
              margin-bottom: 0;
              font-family: 'Inter', sans-serif;
          }
          .paragraph-box .title {
              color: rgba(184, 184, 18, 1);
              font-size: 42px;
              font-weight: 500;
              line-height: 89px;
          }
          .paragraph-box b {
              font-weight: 700;
          }
          .paragraph-box li {
              font-size: 20px;
          }
          .paragraph-box a {
              color: #000;
          }
          @keyframes active {
              from {}
              to {
                  flex: 1;
                  border: 2px solid rgba(234, 234, 36, 1);
                  background: rgba(234, 234, 36, 1);
                  font-weight: 600;
              }
          }
          @keyframes noActive {
              from {
                  flex: 1;
              }
              to {
                  border: 2px solid rgba(0, 0, 0, 1);
                  background: #ffffff;
                  font-weight: 400;
              }
          }
          @keyframes activeforMax1080 {
              from {}
              to {
                  width: calc(100% - 72px);
                  border: 2px solid rgba(234, 234, 36, 1);
                  background: rgba(234, 234, 36, 1);
                  font-weight: 600;
              }
          }
          @keyframes noActiveforMax1080 {
              from {
                  width: calc(100% - 72px);
              }
              to {
                  border: 2px solid rgba(0, 0, 0, 1);
                  background: #ffffff;
                  font-weight: 400;
              }
          }
          @media screen and (max-width:1080px) and (min-width:768px) {
              .tab-box {
                  padding: 0.2rem 0.36rem;
                  max-width: 1414px;
                  margin: 0 auto;
                  display: flex;
                  flex-direction: column;
                  gap: 0;
                  font-size: 0;
              }
              .tab-item {
                  padding: 0 40px;
                  height: 57px;
                  line-height: 57px;
                  display: inline-table;
                  align-items: center;
                  justify-content: center;
                  border: 2px solid rgba(0, 0, 0, 1);
                  color: #000;
                  border-radius: 50px;
                  cursor: pointer;
                  white-space: nowrap;
                  flex: 0;
                  font-size: 0.2rem;
                  text-align: center;
              }
              .tab-box .normal {
                  animation: noActiveforMax1080 0.75s forwards linear;
                  margin-bottom: 10px;
              }
              .tab-box .active {
                  animation: activeforMax1080 0.75s forwards linear;
                  margin-bottom: 10px;
              }
              .paragraph-box {
                  padding: 20px 63px;
                  max-width: 1414px;
                  display: block;
                  margin: 0 auto;
                  font-size: 20px;
              }
          }
          @media screen and (max-width:640px) {
              .li-box {
                  height: 6.1rem;
              }
              .zhuti {
                  height: 6rem;
              }
              .on-shadow-title-box {
                  height: 6rem;
              }
              .center-box {
                  height: 3rem;
                  margin-top: -0.6rem;
              }
              .img-bg {
                  height: 3rem;
              }
              .title-text-bg {
                  background: url('/opencall/assets/title-text.png');
                  width: calc(9.42rem / 2);
                  height: calc(5.45rem / 2);
                  background-size: 100% 100%;
              }
              .on-shadow-title-bg {
                  position: sticky;
                  z-index: -1;
                  left: 0;
                  top: 0;
                  background: url('/opencall/assets/title-shadow.png');
                  width: calc(9.71rem / 2);
                  height: calc(5.31rem / 2);
                  background-size: 100% 100%;
              }
              .tab-box {
                  padding: 0.2rem 0.36rem;
                  max-width: 1414px;
                  margin: 0 auto;
                  display: flex;
                  flex-direction: column;
                  font-size: 0;
                  gap: 0;
              }
              .tab-item {
                  padding: 0 40px;
                  height: 57px;
                  line-height: 57px;
                  display: inline-table;
                  width: auto;
                  align-items: center;
                  justify-content: center;
                  border: 2px solid rgba(0, 0, 0, 1);
                  color: #000;
                  border-radius: 50px;
                  cursor: pointer;
                  font-size: 0.32rem;
                  text-align: center;
              }
              .tab-box .normal {
                  animation: noActiveforMax1080 0.75s forwards linear;
                  margin-bottom: 10px;
              }
              .tab-box .active {
                  animation: activeforMax1080 0.75s forwards linear;
                  margin-bottom: 10px;
              }
              .paragraph-box {
                  padding: 0.3rem 0.24rem;
                  max-width: 1414px;
                  display: block;
                  margin: 0 auto;
                  font-size: 0.2rem;
              }
              .paragraph-box p {
                  margin-bottom: 0.2rem;
                  font-size: 0.28rem;
                  line-height: 1.4;
              }
              .paragraph-box .title {
                  font-size: 0.42rem;
                  line-height: 0.89rem;
              }
              .paragraph-box li {
                  font-size: 0.3rem;
              }
          }
        `}</style>
      </Helmet>

      <div id="app">
        <div className="page-body" id="allText">
          <div className="li-box">
            <div className="zhuti">
              <div className="shadow-title">
                <div className="title-text-bg">
                  {/* Optional header content */}
                </div>
              </div>
              <div className="center-box">
                <div className="img-bg" id="imgBg" />
              </div>
              <div className="on-shadow-title-box">
                <div className="on-shadow-title-bg">
                  {/* Optional header content */}
                </div>
              </div>
            </div>
          </div>
          <div className="content" id="content">
            <div className="tab-box">
              <div
                className={`tab-item ${classActive ? 'active' : 'normal'}`}
                onClick={() => setClassActive(true)}
              >
                Submission Guidelines
              </div>
              <div
                className={`tab-item ${!classActive ? 'active' : 'normal'}`}
                onClick={() => setClassActive(false)}
              >
                Call for Collaboration
              </div>
            </div>

            {classActive ? (
              <>
                <div className="paragraph-box">
                  <p>
                    Join us for NYU's first global showcase of student works that bring together Artificial
                    Intelligence (AI) and interactive media!
                  </p>
                  <p>
                    This is your chance to share your creativity through projects that highlight three core
                    elements: <b>AI integration, interactivity</b>, and <b>global learning</b>. Connect with others,
                    spark conversations, and collaborate to build a vibrant community of innovators. Your ideas and
                    contributions will inspire others and drive innovation forward.
                  </p>
                  <p>We can't wait to see what you create!</p>
                </div>
                <div className="paragraph-box">
                  <div className="title">Eligibility</div>
                  <p>
                    We welcome submissions of student projects that tackle all the following aspects.
                  </p>
                  <p>
                    <b>I. Global Learning.</b> For your learning, who supported you while you built this project in
                    NYU's global network? This could be a mentor, a seminar, or an office hour. Beyond classrooms,
                    what inspired you during your project journey? This could be a story, a conversation, or a
                    collaboration.
                  </p>
                  <p>
                    <b>II. AI Integration.</b> Your project should incorporate AI in some meaningful way.
                  </p>
                  <p>
                    <b>III. Interactivity.</b> Your project should be interactive. Here are some keywords for your
                    inspiration: generative, autonomous, responsive, participatory, kinetic, spatial, algorithmic,
                    systemic, multisensory, augmented, live processing, networked, procedural, embodied, real-time,
                    and hybrid.
                  </p>
                  <p>The possibilities are endless, so be creative!</p>
                </div>
                <div className="paragraph-box">
                  <div className="title">How your work will be displayed</div>
                  <p>
                    You'll have the opportunity to share your work with audiences worldwide through these channels.
                  </p>
                  <p>
                    I. Online Space
                    <br />
                    When your work demonstrates all three core elements (AI integration, interactivity, and global
                    learning), your work will be showcased on the event website.
                  </p>
                  <p>
                    II. Physical Space
                    <br />
                    Want to exhibit your work at a physical location?
                  </p>
                  <p>
                    You could exhibit your work at your home campus or even have it travel across our global locations.
                    (Subject to technical requirements and space availability.)
                  </p>
                  <div style={{ paddingLeft: '24px' }}>
                    <div className="group-class">
                      <p>
                        &gt; XR Space, Interdisciplinary Digital Research Lab, The Hub, Magnolia House at NYU Shanghai campus
                      </p>
                      <p>
                        &gt; Lobby of 370 Jay St location at NYU New York’s Brooklyn Campus
                      </p>
                      <p>&gt; More locations at three campuses to be added</p>
                    </div>
                  </div>
                  <p>
                    In Fall 2025, you may see your work displayed in prestigious public exhibition spaces during
                    Shanghai International Arts Festival season. More details to be announced in Spring.
                  </p>
                  <p>
                    III. Networked display at three campuses
                    <br />
                    One project will be selected and showcased through a networked setup at three campuses.
                  </p>
                  <p>
                    Networked projects will be managing your own networking (i.e. running a backend server that facilitates
                    communication between locations, etc.).
                  </p>
                </div>
                <div className="paragraph-box">
                  <div className="title">How to submit your work</div>
                  <p>
                    Fill in the <b>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://docs.google.com/forms/d/e/1FAIpQLSe38JDSQrawukkE_iaPIl7ht5cLzc24lO6kcThk4Fn89UNXnA/viewform?usp=dialog"
                      >
                        Google Form
                      </a>
                    </b>{' '}
                    to submit your work (Google sign-in required). You can submit multiple works.
                    We will follow up with you once we receive your submission.
                  </p>
                  <p>Submission will be received on a rolling basis until March 31, 2025.</p>
                </div>
                <div className="paragraph-box">
                  <div className="title">Contact</div>
                  <p>
                    For updates, please check{' '}
                    <a target="_blank" rel="noopener noreferrer" href="https://nyuglobal.show/opencall/">
                      our website
                    </a>{' '}
                    regularly.
                    <br />
                    For inquiries, please contact <u>global.show@nyu.edu</u>.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="paragraph-box">
                  <div className="title">How to find collaborators</div>
                  <p>
                    If you are looking for collaborations, we provide multiple opportunities.
                  </p>
                  <p style={{ paddingLeft: '20px' }}>
                    <ul style={{ paddingLeft: '20px' }}>
                      <li>
                        Complete the <b>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://docs.google.com/forms/d/e/1FAIpQLSe38JDSQrawukkE_iaPIl7ht5cLzc24lO6kcThk4Fn89UNXnA/viewform?usp=dialog"
                          >
                            Google Form
                          </a>
                        </b>{' '}
                        to describe your interest. Select "Looking for collaboration." Your information will be added to a shared
                        spreadsheet along with other participants'. Once we receive your request, we will share the spreadsheet with
                        you to help you find a collaborator.
                      </li>
                      <li>
                        Keep an eye on the upcoming speed dating sessions to present your ideas, proposals, and works, and to
                        find collaborators.
                      </li>
                    </ul>
                  </p>
                </div>
                <div className="paragraph-box">
                  <div className="title">Contact</div>
                  <p>
                    For updates, please check{' '}
                    <a target="_blank" rel="noopener noreferrer" href="https://nyuglobal.show/opencall/">
                      our website
                    </a>{' '}
                    regularly.
                    <br />
                    For inquiries, please contact <u>global.show@nyu.edu</u>.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenCallPage;
