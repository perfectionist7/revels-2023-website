import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/DeveloperCard.scss"
import { BsGithub, BsLinkedin, BsInstagram, BsGlobe } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa'
function DeveloperCard(props) {
  return (
    <div>
      <div class="container">
        <div class="card-wrapper">
          <div class="card">
            <div class="card-image">
              <img
                src={props.img}
                alt="profile one"
              />
            </div>

            <ul class="social-icons">
              {props.BsGithub &&
                <li>
                  <a href={props.github} target={'_blank'}>

                    <BsGithub className={"fab"} id={'icon'} />
                  </a>
                </li>}
              {props.linkedIn && <li>
                <a href={props.linkedIn} target={'_blank'}>
                  <FaLinkedinIn className={"fab"} id={'icon'} />
                </a>
              </li>}

              {props.email &&
                <li><a href={`mailto:${props.email}`}>
                  <AiOutlineMail className={"fab"} id={'icon'} />
                </a>
                </li>
              }
              {props.portfolio && <li>
                <a href={props.portfolio} target={'_blank'}>
                  <BsGlobe className={"fab"} id={'icon'} />
                </a>
              </li>}
              {props.instagram && <li>
                <a href={props.instagram} target={'_blank'}>
                  <BsInstagram className={"fab"} id={'icon'} />
                </a>
              </li>}
            </ul>

            <div class="details">
              <h2>
                {props.name}
                <br />
                <span class="job-title">{props.designation}</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeveloperCard;