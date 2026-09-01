export interface ShowcaseItem {
  id: number;
  title: string;
  authors: string;
  program: string;
  size?: { width?: number; height?: number };
  real: boolean;
}

export const showcaseItems: ShowcaseItem[] = [
  { id: 1, title: 'Live-Diffusion', authors: 'Chenxuan Sun, Jinran Ye', program: "NYU Shanghai IMA ", size: { width: 420 }, real: true },
  { id: 2, title: 'DreamyBot', authors: 'Ruiqi Liu', program: "NYU Shanghai IMA", real: true },
  { id: 3, title: 'KUNST KAPUTT', authors: 'Senaida Ng, Brian Ho, Dadabots', program: "NYU IMA Low Res", real: true },
  { id: 4, title: 'Digital Genesis', authors: 'Yanrui Shao and Jiayue Qiu', program: "NYU Shanghai IMA", real: true },
  { id: 5, title: 'Dear Diary', authors: 'Yingfan Chen', program: "NYU Shanghai IMA", real: true },
  { id: 6, title: 'The Silhouette', authors: 'Lizhemei (Riva) Wang & Chenyi Wang', program: "NYU Tandon ID&M", real: true },
  { id: 7, title: 'A Tale of Two Lives', authors: 'Danni Wang', program: "NYU IMA Low Res", real: true },
  {
    id: 8, title: 'Poespin', authors: `
      Cory Yihua Li, Baiyuan Xin, Cardin An Chung<br/>
      Wendy Li, Jiayi Li, Archy Hongyue Cheng<br/>
      Reraner Yetong Xin, Armon Naeini<br/>`,
    program: `NYU Tisch ITP/IMA, USC Thornton<br/> Universität Freiburg English Literatures and Literary Theory<br/> Harvard GSD`,
    real: true
  },
  { id: 9, title: 'Arrival', authors: 'Jiaqi Yi', program: "NYU Tisch ITP/IMA", real: true },
  { id: 10, title: 'GenLight', authors: 'Tatsan Chen', program: "NYU Tandon ID&M", real: true },
  { id: 11, title: 'Lingo Bud', authors: 'Jiahui(Georgia) Chen, Chenxu (Cathy) Li, Will Park', program: "NYU Tisch ITP/IMA", real: true },
  { id: 12, title: 'The Theater', authors: 'John Luo', program: "NYU Tisch ITP/IMA", real: true },
  { id: 13, title: 'Memourn', authors: 'Jiachen Zhou', program: "NYU Tisch ITP/IMA", real: true },
  { id: 14, title: 'Forgiveness 荒村别墅', authors: 'Liyanbing He', program: "NYU IMA Low Res", real: true },
  { id: 15, title: 'The Red Line', authors: 'Jasmine Nackash', program: "NYU Tisch ITP/IMA", real: true },
  { id: 16, title: 'BABEL 巴别塔', authors: 'Ken Zhixing Zhang', program: "NYU Shanghai IMA", real: true },
  { id: 17, title: 'Unheld', authors: 'Yuzhuo Sun (Zora)', program: "NYU Shanghai IMA", real: true },
  { id: 18, title: "It's Okay to Let Go", authors: 'Wanyu Chen', program: "NYU Shanghai IMA", real: true },
  { id: 19, title: 'Faces in Motion', authors: 'Jingchen Gao', program: "NYU Shanghai IMA", real: true },
  { id: 20, title: 'Sentimental Galaxy', authors: 'Cara Cai', program: "NYU Tisch ITP/IMA", real: true },
  { id: 21, title: 'Input/Output', authors: 'Emy Sainbayar', program: "NYU Shanghai IMA", real: true },
  { id: 22, title: 'Interactive Neural Networks', authors: 'Xiaozao Wang', program: "NYU Shanghai IMA", real: true },
];
