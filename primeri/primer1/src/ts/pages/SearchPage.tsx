import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import QueryResult from '../components/QueryResult';

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const entries = searchParams.entries();
    let queryStrings = parseQueryStrings();
    let noSearchResults = false;

    // parse all query strings from url
    function parseQueryStrings() {
        let entry,
            queryStrings = '';

        while (true) {
            entry = entries.next();

            // if there are no more entries, then remove last comma and space signs
            if (entry.done) {
                queryStrings = queryStrings.slice(0, queryStrings.length - 2);
                break;
            }

            queryStrings += entry.value[0] + ' = ' + entry.value[1] + ', ';
        }

        return queryStrings;
    }

    return (
        <div className='search-page'>
            <h2 className='search-page__heading main__heading'>
                Search results for <q>{queryStrings}</q>
            </h2>
            <div className='search-page__queries'>
                {noSearchResults ? (
                    <p className='search-page__message'>
                        Sorry, no search results found . . .
                    </p>
                ) : (
                    <>
                        <QueryResult
                            image={{
                                path: '/images/mens/jackets/01.jpg',
                                url: '/products/mens/jackets/01',
                            }}
                            cost={75}
                            description={
                                "This is the best jacket in the world and that's the reason why it's best..."
                            }
                            heading='Jacket number one'
                        />
                        <QueryResult
                            image={{
                                path: '/images/mens/jackets/02.jpg',
                                url: '/products/mens/jackets/02',
                            }}
                            cost={50}
                            description={
                                "This is the best jacket in the world and that's the reason why it's best..."
                            }
                            heading='Jacket number two'
                        />
                        <QueryResult
                            image={{
                                path: '/images/mens/jackets/03.jpg',
                                url: '/products/mens/jackets/03',
                            }}
                            cost={50}
                            description={
                                "This is the best jacket in the world and that's the reason why it's best..."
                            }
                            heading='Jacket number three'
                        />
                        <QueryResult
                            image={{
                                path: '/images/mens/jackets/04.jpg',
                                url: '/products/mens/jackets/04',
                            }}
                            cost={50}
                            description={
                                "This is the best jacket in the world and that's the reason why it's best..."
                            }
                            heading='Jacket number four'
                        />
                    </>
                )}
            </div>
            {!noSearchResults && (
                <div className='search-page__pagination'>
                    <Pagination />
                </div>
            )}
        </div>
    );
}
