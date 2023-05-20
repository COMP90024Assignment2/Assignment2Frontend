import React from "react";
import "./Title.css";
import member1Image from './1.png';
import member2Image from './2.png';
import member3Image from './3.png';
import member4Image from './4.png';
import member5Image from './5.png';

const HandwrittenTitle = ({ text }) => {
  return (
    <div>
      <h1 className="handwritten-title">
        <span>{text}</span>
      </h1>
      <div className="group-members">
        <ul>
          <li>
            <div>
              <img src={member1Image} alt="Member" />
              <h3>Shengnan Wang</h3>
              <h4>Ansible</h4>
            </div>
          </li>
          <li>
            <div>
              <img src={member2Image} alt="Member" />
              <h3>Yuxin Han</h3>
              <h4>Data</h4>
            </div>
          </li>
          <li>
            <div>
              <img src={member3Image} alt="Member" />
              <h3>Minghan Xue</h3>
              <h4>Data</h4>
            </div>
          </li>
          <li>
            <div>
              <img src={member4Image} alt="Member" />
              <h3>Jia Zhao</h3>
              <h4>Frontend</h4>
            </div>
          </li>
          <li>
            <div>
              <img src={member5Image} alt="Member" />
              <h3>Jionghao Chen</h3>
              <h4>Backend</h4>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HandwrittenTitle;

