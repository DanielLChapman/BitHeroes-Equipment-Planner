import React from 'react';

const AboutWindow = (props) => (
    <div className="about-window"  style={props.styling}>
        <span className="x-close" onClick={() => {props.openClose('About')}}>x</span>
        <section style={{paddingTop: '10px'}}>

            <span style={{textDecoration: 'underline'}}>UPDATES:</span>
            <ul className="about-page-ul">
                <li>1/22/2021  - Added 2 Meta runes for Akiho Set. Added Akiho set.</li>
                <li>1/14/2021  - Added Evolvium</li>
                <li>10/14/2020 - All new T14 equipment has been added.</li>
                <li>8/25/2020  -  Added new sets and mythics from nether 10-13</li>
                
                <li>5/31/2020  -   Updated With new t13 mythic and set equipment!</li>
                <li>5/11/2020  -   Updated new mythic equipment and enchants, dont have stat upgrades for Resistor and Mythic Core. If you have either let me know what gets upgraded each time.</li>
                <li>4/9/2020   -   Added Vapnels and Grasberg sets, and updated equipment with new values from 4/9 update.</li>
                <li>3/31/2020  -   Added some of the new equipment from orlag, dont have the t10 or t11 sets data to add. </li>
                <li>Testing out equipment filler. It has plenty of issues, so dont take its word as law. </li>
                <li>3/19/2020  -   Added Filters for Sets, Mythics, and By Slot. You can remove Tiers, Expedition, Ancients, or text search</li>
                <li className={'about-amendum'}>For example, you can search for dual strike equipment, or "sp" will return any equipment that has "sp" anywhere in it.</li> <br />
                <li>3/12/2020  -   Added New Mythic Enchants and Runes</li>
                <li>Added New Mythic Enchants and Runes</li>
                <li>Added toggle to stat window for those people who dont have t12 ancients yet. Dont want to inflate numbers for people who haven't uptiered yet.</li>
                <li>Block wasn't being capped at 100 in stats, so 140 block was adding 70% mitigation. This is corrected now.</li>
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
                <li>Add New Ancient</li>
                <li>Add apocalypse to equipment fillter</li>
                <li>Add any tank/dps/healer/etc identifiers to equipment/sets/mythics for future filtering</li>
            </ul>

        </section>
        <section style={{paddingTop: '10px'}}>

            <span style={{textDecoration: 'underline'}}>ABOUT:</span>
            <ul className="about-page-ul">
                <li>Created by RustyPeach#6491 on discord, RustyPeach and rustypeach2 in game.</li>
                <li>If you have any suggestions of what you want added or changed, I'm happy to hear it. </li>
                <li className={'about-amendum'}>You can either DM directly or ping me in either the official or unofficial discord</li>
                <li>All the formulas on the stat page are made from combining the elemental formulas with: <a href="https://docs.google.com/spreadsheets/d/1OnSqp7a_hkQ94HijWAt704M3bA8vAibgwfR70JyXg5g/edit#gid=1961024465">Link2012's Mega Calculator Pack (using quick calculation page)</a> </li>
                <li className={'about-amendum'}>If there are other calculations you want added, I'm happy to throw them in there. All the numbers on the stats page are numbers you can include in any fashion. </li>
            </ul>

        </section>
    </div>

)

export default AboutWindow;
