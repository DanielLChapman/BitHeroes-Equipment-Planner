import React from 'react';

const OptimizerNotice = props => {

    let a = '';
    let b = '';
    let c = '';


    if(props.title === 'Notice/Help') {
        a = 'Notice/Help';
        b = (
            <>
            First, this is experimental. This will loop through all possible equipment options with the slots selected below, searching for the highest stat value selected below. <br /><br />
            Some of the equipment had to be normalized to a value that may not be accurate (like moon collage with weighted chances).<br /><br />
            Other equipment doesn't even affect these values because I wasn't sure of how to add it to the calculations (like Necrosis)<br /><br />
            Then some items are only for under or over X % of health and not all the time, but those conditional values are calculated in (like divinity set) so it wouldn't be for every hit<br /><br />
            These calculations are from Link's Excel Sheet with Elemental Effects added into the Calcualtions.<br /><br />
            Each elemental damage reduction is reduced to 75% before combined damage reduction per element<br /><br />
            Any other questions or suggestions, hit me up on discord RustyPeach#6491
        </>);
        c = 'Note'
    } else if (props.title === 'How To Use') {
        a = 'How To Use';
        b = (
            <>
            First, this is based on what is currently equipped in the application, including runes and enchants. <br /> 
            Please make sure you have everything equipped that you will want to keep the same. If a slot is empty and not selected below, it will stay empty. <br /><br />
            Second, the number of options available is extreme. Before runes and enchants are added in, there are millions of combinations avaiable. <br />
            Because of this, this will be limited to a maximum of 4 equipment choices. If you want to use more than 4 slots, then its at your own risk. <br />
            <button className={`notice-button notice-button-${props.over4}`}  onClick={() => {
                props.clickHandler('Four');
            }}>{
                !props.over4 ? 'Click here to allow more than 4' : '4 or more allowed'
            }</button>
            <br /><br />
            Runes and Enchants haven't been added in yet, also planning on adding the option to ignore sets.<br /><br />
            <b>1.</b> Select which option you want to search for. If nothing is selected, it wont run. <br />
            <b>2.</b> Select which slots you want to search with, these will be what slots are changed <br />
            <b>3.</b> Sit and wait, 4 slots can easily get above 1 million options so this might take some processing time <br /><br />
        </>)
        c = 'Howto';
    }

    return (
        <>
            <button className={`notice-button notice-button-${props.note}`} onClick={() => {
                props.clickHandler(c);
            }}>{a}</button>
            <section className="notes" style={props.styleProp}>
                {b}
            </section>
        </>
    )
}
export default OptimizerNotice;