import Style from './Banner.module.css';

const Banner = (props) => {

    return (
        <div className={Style.bannerWrapper}>

            <div className={Style.bannerTextWrapper}>
                <div className={Style.bannerHeader}> {props.header} </div>
                <div className={Style.bannerTitle}> {props.title} </div>
            </div>

            <div>
                Search for Shabu store near me!
                <div className={Style.buttonWrapper}>
                    <button className={Style.button} onClick={props.searchClicked}>
                        {props.buttonText}
                    </button>
                </div>

            </div>

        </div>
    );

}
export default Banner;