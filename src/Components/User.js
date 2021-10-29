import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import Repository from "./Repository";
import Loader from "react-loader-spinner";
import '../Scss/User.scss';


export default function User() {

    const [apiUser, setApiUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [filteredRepositories, setFilteredRepositories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useParams();
    const history = useHistory();

    useEffect(() => {
        getUser();
        getRepos();
    }, []);


    function searchRepo(e) {
        const searchLabel = e.target.value.toLowerCase();
        if (searchLabel === '') {
            setFilteredRepositories(repos);
        } else {
            const repositories = repos.filter(repo => repo.name.toLowerCase().includes(searchLabel));
            setFilteredRepositories(repositories)
        }

    }

    const getUser = () => {
        axios.get(`https://api.github.com/users/` + user)
            .then(res => {
                setApiUser(res.data);
            })
            .catch(error => {
                history.push('/404');
            });
    }

    const getRepos = () => {
        axios.get(`https://api.github.com/users/` + user + '/repos')
            .then(res => {
                setRepos(res.data);
                setFilteredRepositories(res.data);
                setIsLoading(false);
            })
            .catch(error => {
            });
    }

    return (
        <div>
            {isLoading ? (
                <Loader
                    className={'spinner'}
                    type="Rings"
                    color="#353b48"
                    height={300}
                    width={300}
                />
            ) : (
                <div className={'user-container'}>
                    <div className={'container'}>
                        <div className={'user-infos-container col-md-3 col-12 me-4'}>
                            <div className={'user-avatar-container'}>
                                <img className={'user-avatar img-fluid'} src={apiUser.avatar_url} alt="" />
                            </div>
                            <div className={'user-infos'}>
                                <div className={'user-name'}>{apiUser.name}</div>
                                <div className={'user-login'}>{apiUser.login}</div>
                                <div className={'user-bio'}>{apiUser.bio}</div>
                            </div>
                        </div>
                        <div className={'user-repos-container col-md-9 col-12'}>
                            <div className={'user-repos-header'}>
                                <div className={'text-container'}>
                                    <div className={'text'}>
                                        Repositories
                                    </div>

                                </div>
                            </div>

                            <div className={'search-input-container mt-3'}>
                                <input className={'search-input'}
                                    onChange={(e) => searchRepo(e)}
                                    type="text"
                                    placeholder={'Type the repository name you\'re looking for'} />
                            </div>

                            <div className={'repositories-container'}>
                                {
                                    filteredRepositories.length ? (
                                        filteredRepositories.map(repo => <Repository key={repo.id} repo={repo} />)
                                    ) : (
                                        <div className={'no-repos'}>0 repositories found.</div>
                                    )
                                }
                                { }
                            </div>
                        </div>
                    </div>
                </div>

            )}

        </div>
    );
}