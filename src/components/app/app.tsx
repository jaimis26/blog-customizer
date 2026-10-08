import { defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState, type CSSProperties } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [currentState, setCurrentState] = useState(defaultArticleState);

  const handleParamsState = (newState: typeof currentState): void => {
    setCurrentState(newState);
  };

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': currentState.fontFamilyOption.value,
          '--font-size': currentState.fontSizeOption.value,
          '--font-color': currentState.fontColor.value,
          '--container-width': currentState.contentWidth.value,
          '--bg-color': currentState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm onChange={handleParamsState} />
      <Article />
    </main>
  );
};
