import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Howl, Howler } from "howler";

export default function Dictionary(props) {
  const [word, setWord] = useState([]);

  useEffect(() => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${props.input}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 1) {
          setWord(data);
        } else if (data.length > 1) {
          setWord([data[0]]);
        } else {
          alert(data.message)
        }
      })
      .catch(() => {
        alert(
          "Oops! An error occured, please check your internet connection and try again."
        );
      });
  }, [props.trigger]);

  function toggleSound(src) {
    const sound = new Howl({
      src,
    });
    sound.play();
  }

  let wordDisplayElement;
  if (word) {
    wordDisplayElement = word.map((elements) => {
      return (
        <div className="result-container" key={nanoid()}>
          <div className="phonetics flex mid-margin">
            <div className="word-info">
              <p className="word-title sec-font1 pri-margin">{elements.word}</p>
              {elements.phonetics.length >= 1 && (
                <>
                  {elements.phonetics.map((phonetic) => {
                    {
                      if (phonetic.text && phonetic.audio) {
                        return (
                          <p key={nanoid()} className="text sec-font2">
                            <span>{phonetic.audio.slice(-6, -4)}:</span>
                            {phonetic.text}
                          </p>
                        );
                      }
                    }
                  })}
                </>
              )}
            </div>
            {elements.phonetics.length >= 1 && (
              <>
                {elements.phonetics.map((phonetic) => {
                  {
                    if (phonetic.text && phonetic.audio) {
                      return (
                        <div key={nanoid()} className="audio">
                          <div
                            className="audio-controls"
                            onClick={() => toggleSound(phonetic.audio)}
                          >
                            <i className="fa-solid fa-play"></i>
                          </div>
                          {elements.phonetics.map((phonetic) => {
                            if (phonetic.text && phonetic.audio) {
                              return (
                                <audio
                                  key={nanoid()}
                                  src={phonetic.audio}
                                  controls
                                ></audio>
                              );
                            }
                          })}
                        </div>
                      );
                    }
                  }
                })}
              </>
            )}
          </div>

          {elements.meanings.map((meaning) => {
            return (
              <section key={nanoid()}>
                <div className="meaning-header mid-margin">
                  <p className="speech pri-fz sec-font">
                    {meaning.partOfSpeech}
                  </p>
                  <div className="line"></div>
                </div>
                <p className="sec-font sub-heading mid-margin">Meaning</p>
                {meaning.definitions.map((definition) => {
                  return (
                    <ul key={nanoid()} className="definition-list">
                      <li className="list-items small-fz">
                        {definition.definition}
                      </li>
                    </ul>
                  );
                })}
                {meaning.synonyms.length >= 1 && (
                  <div className="synonym-container">
                    <p className="synonym-title sec-font sub-heading">
                      Synonyms
                    </p>
                    {meaning.synonyms.map((synonym) => {
                      return (
                        <p key={nanoid()} className="synonym small-fz sec-font">
                          {synonym}
                        </p>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}

          {elements.sourceUrls.map((source) => {
            return (
              <div
                key={nanoid()}
                className="synonym-container source-container source-fz"
              >
                <p className="source-title source-fz sec-font3">Source</p>
                <a className="source" href={source} target="_blank">
                  {source}
                </a>
              </div>
            );
          })}
        </div>
      );
    });
  }

  return <>{wordDisplayElement}</>;
}
