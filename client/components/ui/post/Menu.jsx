import React from 'react';
import './menu.less';

export default class Menu extends React.Component {
    constructor(props) {
        super();

        this.state = {
            showMenu: false,
            submenu: -1
        }
    }

    toggleMenu(index) {
        this.setState({showMenu: !this.state.showMenu, submenu: -1});
    }

    toggleSubmenu(index) {
        this.setState({submenu: (this.state.submenu === index) ? -1 : index});
    }

    render() {
        const menu = this.props.menu,
            entries = menu ? menu.items : entries;

        if (!entries || !entries.length) {
            return null;
        }


        if (entries.length > 1) {
            if (this.state.showMenu) {
                return (<div className="postMenu">
                    <span className={'menuIcon fa fa-lg pointer ' + (menu.symbol ? menu.symbol : 'fa-ellipsis-v')} title="Aktionen" onClick={() => this.toggleMenu()}></span>
                    <ul className="entryList">
                        {
                            entries.map((entry, index) =>
                            entry.submenu
                            ? <li key={index}>
                                <div className="submenuTop menuItem pointer" onClick={() => this.toggleSubmenu(index)}>
                                    <span className={((this.state.submenu === index) ? 'fa-minus' : 'fa-plus') + ' fa submenuIcon pointer'}></span>
                                    <div className="entry" title={entry.title ? entry.title : entry.name}>{entry.name}</div>
                                </div>
                                {
                                    (this.state.submenu === index)
                                    ? <ul className="submenu">
                                        {
                                            entries[index].submenu.map((subentry, subindex) =>
                                            <li key={subindex} onClick={() => subentry.action()} className="menuItem pointer">
                                                {
                                                    (subentry.symbol)
                                                    ? <span className={subentry.symbol + ' submenuIcon fa pointer'}></span>
                                                    : null
                                                }
                                                <div className="entry" title={subentry.title ? subentry.title : subentry.name}>{subentry.name}</div>
                                            </li>)
                                        }
                                    </ul>
                                    : null
                                }
                            </li>
                            : <li key={index} onClick={() => entry.action()} className="menuItem pointer">
                                {
                                    (entry.symbol)
                                    ? <span className={entry.symbol + ' submenuIcon fa pointer'}></span>
                                    : null
                                }
                                <div className="entry" title={entry.title ? entry.title : entry.name}>{entry.name}</div>
                            </li>)
                        }
                    </ul>
                </div>);

            } else {
                return <span className={'menuIcon fa fa-lg pointer ' + (menu.symbol ? menu.symbol : 'fa-ellipsis-v')} title={menu.title ? menu.title : 'Aktionen'} onClick={() => this.toggleMenu()}></span>;
            }
        } else {
            let entry = entries[0];

            return <span className={(entry.symbol ? entry.symbol : 'fa-ellipsis-v') + ' menuIcon fa pointer fa-lg'} title={entry.title ? entry.title : entry.name} onClick={() => entry.action()}></span>;
        }

    }
}