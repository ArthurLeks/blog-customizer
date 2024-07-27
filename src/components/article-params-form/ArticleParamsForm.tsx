import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useState } from 'react';
import clsx from 'clsx';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';

interface ArticleParamsFormProps {
	setArticleParams: (articleParams: ArticleStateType) => void;
}
export const ArticleParamsForm = ({
	setArticleParams,
}: ArticleParamsFormProps) => {
	const [isOpened, setIsOpened] = useState(false);
	const [formArticleParams, setFormArticleParams] =
		useState<ArticleStateType>(defaultArticleState);

	const toggleIsOpened = () => {
		setIsOpened(!isOpened);
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleParams(formArticleParams);
	};

	const handleFormReset = () => {
		setArticleParams(defaultArticleState);
		setFormArticleParams(defaultArticleState);
	};

	const handleInputChange = (
		propName: keyof ArticleStateType,
		propValue: OptionType
	) => {
		setFormArticleParams({
			...formArticleParams,
			[propName]: propValue,
		});
	};

	const handleCloseForm = () => {
		setIsOpened(false);
	};

	return (
		<>
			<ArrowButton onClick={toggleIsOpened} isOpened={isOpened} />
			<aside
				className={clsx(styles.container, isOpened && styles.container_open)}>
				<form
					className={styles.form}
					onReset={handleFormReset}
					onSubmit={handleFormSubmit}>
					<Text as='h2' size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formArticleParams.fontFamilyOption}
						title='шрифт'
						onChange={(font) => handleInputChange('fontFamilyOption', font)}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formArticleParams.fontSizeOption}
						onChange={(fontSize) =>
							handleInputChange('fontSizeOption', fontSize)
						}
						title='размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={formArticleParams.fontColor}
						title='цвет шрифта'
						onChange={(fontColor) => handleInputChange('fontColor', fontColor)}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formArticleParams.backgroundColor}
						title='цвет фона'
						onChange={(backgroundColor) =>
							handleInputChange('backgroundColor', backgroundColor)
						}
					/>
					<Select
						options={contentWidthArr}
						selected={formArticleParams.contentWidth}
						title='ширина контента'
						onChange={(contentWidth) =>
							handleInputChange('contentWidth', contentWidth)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
			<div
				className={clsx(styles.background, isOpened && styles.background_open)}
				onClick={handleCloseForm}
			/>
		</>
	);
};
