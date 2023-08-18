import React, { useState } from 'react';
import Form from './Form';
import Results from './Results';
import Image from 'next/image';
import logo from '../public/copykittLogo.svg';

const CopyKitt = () => {
  const ENDPOINT =
    'https://64u5j05jgf.execute-api.us-east-1.amazonaws.com/prod/generate_snippet_and_keywords';
  const CHAR_LIMIT = 32;

  const [prompt, setPrompt] = useState('');
  const [snippet, setSnippet] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [hasResult, setHasResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);
    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(
        //   console.log
        onResult
      );
  };

  const onResult = (data) => {
    setSnippet(data.snippet);
    setKeywords(data.keywords);
    setHasResult(true);
    setIsLoading(false);
  };

  const onReset = () => {
    setSnippet('');
    setKeywords([]);
    setPrompt('');
    setHasResult(false);
    setIsLoading(false);
  };

  let displayedElement = null;

  if (hasResult) {
    displayedElement = (
      <Results
        snippet={snippet}
        keywords={keywords}
        onBack={onReset}
        prompt={prompt}
      />
    );
  } else {
    displayedElement = (
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
        charLimit={CHAR_LIMIT}
        isLoading={isLoading}
      />
    );
  }

  const gradientTextStyle =
    'text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto';

  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-slate-800 p-6 rounded-md text-white">
          <div className="text-center my-6">
            <Image src={logo} width={42} height={42} className="mx-auto m-4" />
            <h1 className={gradientTextStyle + ' text-3xl font-light'}>
              CopyKitt
            </h1>
            <div className={gradientTextStyle}>Your AI branding assistant</div>
          </div>

          {displayedElement}
        </div>
      </div>
    </div>
  );
};

export default CopyKitt;
