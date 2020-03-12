import React from 'react';

const OptimizerDropdown = props => {


    let a = (props.data.map((x) => {
        return (
            <option value={x.option} key={x.id}>{x.key}</option>
        )
    }));


    return (
        <>
            <section className="dropdown">
                <form>
                    <label htmlFor="search-options">{props.title}</label><br />
                    <select id="search-options" className="search-options" name="search-options" onChange={(e) => {
                        props.handleChange(e, props.switchOperator)
                    }} multiple={props.multiple}>
                        <option value="none">None</option>
                        {
                            a
                        }
                    </select>
                    <br />
                </form>
            </section>
        </>
    )
}
export default OptimizerDropdown;