import React from 'react';
import QuickSearchItem from './QuickSearchItem';

class QuickSearch extends React.Component {
    render() {
        const { mealTypesData } = this.props;
        return (
            <div>
                <div className="quicksearch">
                    <p className="quicksearchHeading">
                        Quick Searches
                    </p>
                    <p className="quicksearchSubHeading">
                        Discover restaurants by type of meal
                    </p>

                    <div className="container">
                        <div className="row">
                            {mealTypesData.map((item) => {
                                return <QuickSearchItem quickSearchItemData={item} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuickSearch;