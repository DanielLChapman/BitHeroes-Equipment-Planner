import React from 'react';

const AboutWindow = (props) => (
    <div className="optimizer-window"  style={props.styling}>
        <span className="x-close" onClick={() => {props.openClose('About')}}>x</span>
        <section style={{paddingTop: '10px'}}>

            <span style={{textDecoration: 'underline'}}>UPDATES:</span>
            <ul className="about-page-ul">
                <li>Added New Mythic Enchants and Runes</li>
                <li className={'about-amendum'}>Since the new enchants already have two substats, you can not have a second stat.<br />
                If you are having issues with changing enchants with the new mythic ones, you need to remove them first.</li>
                <li>Added New Ancient Equipment, Aryagn Sight and Ladener Broom.</li>
                <li>All ancients now have +5% Damage and Damage Reduction</li>
                <li>Total Damage Reduction for each element is now added to the stats page. </li>
                <li className={'about-amendum'}>This is just total damage reduction with each element considered. Total mitigation is still listed which includes evade, deflect, absorb, block, etc. <br />For Example, Physical Damage Reduction is 75% of each elemental resistances added to 100% of physical Damage Reduction, this is then capped at 75% if it goes over. Each elemental damage reduction is also capped at 75% before being added to this calculation. </li>
                <li>You can now click on an empty equipment slot and it will bring you to the corresponding By-Slot section</li>
            </ul>

        </section>
        <section style={{paddingTop: '10px'}}>

            <span style={{textDecoration: 'underline'}}>TODO:</span>
            <ul className="about-page-ul">
                <li>Filtering on sets and mythics, by tier first. </li>
                <li>Add any tank/dps/healer/etc identifiers to equipment/sets/mythics for future filtering</li>
                <li>Search for specific sets/mythics to make it easier to find them.</li>
                <li>Optimizer function that searches through possible combinations of items to finish your build, maximizing a specific stat you are looking for.</li>
                <li className={'about-amendum'}>This wouldn't be 100% accurate because of mythics like moon collage or necrosis where their contributions to stats like damage, or mitigation, are hard to lock down to a specific number.<br /></li>
            </ul>

        </section>
        <section style={{paddingTop: '10px'}}>

            <span style={{textDecoration: 'underline'}}>ABOUT:</span>
            <ul className="about-page-ul">
                <li>Created by RustyPeach#6491 on discord, RustyPeach and rustypeach2 in game.</li>
                <li>If you have any suggestions of what you want added or changed, I'm happy to hear it. </li>
                <li className={'about-amendum'}>You can either DM directly or ping me in either the official or unofficial discord</li>
                <li>All the formulas on the stat page are made from combining the elemental formulas with: <a href="https://docs.google.com/spreadsheets/d/1OnSqp7a_hkQ94HijWAt704M3bA8vAibgwfR70JyXg5g/edit#gid=1961024465">Link2012's Mega Calculator Pack (using quick calculation page}</a> </li>
                <li className={'about-amendum'}>If there are other calculations you want added, I'm happy to throw them in there. All the numbers on the stats page are numbers you can include in any fashion. </li>
            </ul>

        </section>
    </div>

)

export default AboutWindow;
