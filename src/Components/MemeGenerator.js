import React, {Component} from "react"

class MemeGenerator extends Component{
    constructor(props) {
        super(props);
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const{memes} = response.data
                console.log(memes[0])
                this.setState({allMemeImgs: memes})
            })
    }

    handleChange(event){
        event.preventDefault()
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmit(event){
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({randomImg: randMemeImg})
    }

    render() {
        return(
            <main id="main-page">
                <div>
                    <form className="meme-form" onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.topText} name="topText" onChange={this.handleChange} placeholder="Top text:"/>
                        <input type="text" value={this.state.bottomText} name="bottomText" onChange={this.handleChange} placeholder="Bottom text:"/>
                        <button>Generate</button>
                    </form>
                    <div className="meme">
                        <img className="myImage" src={this.state.randomImg} alt=""/>
                        <h2 className="top">{this.state.topText}</h2>
                        <h2 className="bottom">{this.state.bottomText}</h2>
                    </div>
                </div>
            </main>
        )
    }

}
export default MemeGenerator