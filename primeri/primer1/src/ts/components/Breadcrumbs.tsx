import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface UrlObject {
    urlPart: string;
    fullPath: string;
}

type UrlPath = UrlObject[];

export default function Breadcrumbs() {
    const [hideContent, setHideContent] = useState(false);
    const location = useLocation();
    const [urlPath, setUrlPath] = useState<UrlPath>([]);
    const listElements = createListElements();

    const breadcrumbsClass = hideContent
        ? 'breadcrumbs breadcrumbs--hide'
        : 'breadcrumbs';

    function showHideContent() {
        setHideContent(!hideContent);
    }

    // parse url and set paths to the breadcrumbs local state
    useEffect(() => {
        const slicedUrl = location.pathname.slice(1);
        const urlParts = slicedUrl.split('/');
        let finalUrl: UrlPath = [];
        let currentPath = '';

        // create current path on the fly and push it to the array along with url part
        for (let i = 0; i < urlParts.length; i++) {
            currentPath += `/${urlParts[i]}`;

            let capitalizeUrlPart = capitalizeWords(urlParts[i]);

            finalUrl.push({
                urlPart: capitalizeUrlPart,
                fullPath: currentPath,
            });
        }

        setUrlPath(finalUrl);
    }, [location]);

    // capitalize single word or more words separated by dash
    function capitalizeWords(words: string) {
        let lowerCaseWords = words.toLowerCase();
        let capitalizeWords = '';

        if (lowerCaseWords !== '') {
            // split words with dashes if they exist and capitalize each word separately
            let moreWords = lowerCaseWords.split('-');
            let currentWord: string;

            // capitalize first character for every word splitted by dash
            for (let i = 0; i < moreWords.length; i++) {
                currentWord = moreWords[i];
                capitalizeWords +=
                    currentWord[0].toUpperCase() + currentWord.slice(1);

                // add space if it's not last word
                if (i < moreWords.length - 1) capitalizeWords += ' ';
            }
        }

        return capitalizeWords;
    }

    function createListElements() {
        const listElements = urlPath.map((url, index, array) => {
            const lastElement = index === array.length - 1;

            // create new list element only if part of the url is not empty string
            if (url.urlPart !== '') {
                return (
                    <li className='breadcrumbs__item' key={index}>
                        {lastElement ? (
                            <span className='breadcrumbs__link'>
                                {url.urlPart}
                            </span>
                        ) : (
                            <Link
                                to={url.fullPath}
                                className='breadcrumbs__link'
                            >
                                {url.urlPart}
                            </Link>
                        )}
                    </li>
                );
            } else return null;
        });

        if (!listElements[0]) return [];
        else return listElements;
    }

    return (
        <div className={breadcrumbsClass}>
            <div className='content'>
                <div className='breadcrumbs__wrapper'>
                    <ul className='breadcrumbs__list'>
                        <li className='breadcrumbs__item'>
                            {listElements.length ? (
                                <Link to='/' className='breadcrumbs__link'>
                                    Home
                                </Link>
                            ) : (
                                <span className='breadcrumbs__link'>Home</span>
                            )}
                        </li>
                        {listElements}
                    </ul>
                    <div className='breadcrumbs__box' onClick={showHideContent}>
                        <i className='fa-solid fa-circle-chevron-up breadcrumbs__icon'></i>
                        <span className='breadcrumbs__hide'>Hide</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
