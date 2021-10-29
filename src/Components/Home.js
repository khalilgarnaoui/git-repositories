import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import '../Scss/Home.scss';

export default function Home() {

    //We use history to go push and pop pages
    const history = useHistory();

    const [user, setUser] = useState('');

    const redirectToUser = () => {
        if (user !== '') history.push('/users/' + user);
    }

    // If we click on enter instead of the search icon

    useEffect(() => {
        const input = document.getElementsByClassName('search-input')[0];
        input.addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
                const search_icon = document.getElementsByClassName('search_icon')[0];
                search_icon.click();
            }
        })
    }, []);


    return (
        <div className={'home-container'}>
            <div className={'logo'}>  <div className={'items'}> Find your repos. </div> </div>
            <div className={'content'}>
                <div className={'github-icon-container'} >
                    <FontAwesomeIcon className={'github-icon'} icon={faGithub} size={'10x'} />
                </div>
                <div className="text-typing">
                    <p>Type a github username.</p>
                </div>
                <div className="searchbar">
                    <input className="search-input" type="text" placeholder="Ex : khalilgarnaoui" onChange={(e) => setUser(e.target.value)} />
                    <a onClick={redirectToUser} className="search_icon"> <FontAwesomeIcon className={'search-icon'} icon={faSearch} color={'#fbdc4b'} />
                    </a>
                </div>
            </div>
        </div>
    );
}