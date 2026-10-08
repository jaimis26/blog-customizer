import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type ArticleStateType,
  type OptionType,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { useOutsideClickClose } from '@/ui/select/hooks/useOutsideClickClose';
import { Text } from '@/ui/text';
import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onChange: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onChange }: ArticleParamsFormProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

  const onClickAside = (event: React.FormEvent): void => {
    event?.preventDefault();
    onChange(formState);
  };

  const handleToggle = (): void => {
    setIsOpen((prev) => !prev);
  };

  const asideRef = useRef<HTMLDivElement | null>(null);

  useOutsideClickClose({
    isOpen: isOpen,
    rootRef: asideRef,
    onChange: setIsOpen,
  });

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={handleToggle} />

      <aside
        ref={asideRef}
        className={clsx(styles.container, isOpen && styles.container_open)}
      >
        <form className={styles.form} onSubmit={onClickAside}>
          <Text size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title={'шрифт'}
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={(selected: OptionType) => {
              setFormState((prevState) => ({
                ...prevState,
                fontFamilyOption: selected,
              }));
            }}
          />
          <RadioGroup
            name={'font-size'}
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            title={'размер шрифта'}
            onChange={(selected: OptionType) => {
              setFormState((prevState) => ({
                ...prevState,
                fontSizeOption: selected,
              }));
            }}
          />
          <Select
            title={'цвет шрифта'}
            options={fontColors}
            selected={formState.fontColor}
            onChange={(selected: OptionType) => {
              setFormState((prevState) => ({
                ...prevState,
                fontColor: selected,
              }));
            }}
          />
          <Select
            title={'цвет фона'}
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={(selected: OptionType) => {
              setFormState((prevState) => ({
                ...prevState,
                backgroundColor: selected,
              }));
            }}
          />
          <Select
            title={'ширина контента'}
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={(selected: OptionType) => {
              setFormState((prevState) => ({
                ...prevState,
                contentWidth: selected,
              }));
            }}
          />
          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="button"
              type="clear"
              onClick={() => {
                setFormState(defaultArticleState);
                onChange(defaultArticleState);
              }}
            />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
