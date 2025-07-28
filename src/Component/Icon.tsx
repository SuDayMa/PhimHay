function Icon(props: {name?:string}){
    if(props.name === 'tim kiem'){
        return <i className='bx bx-search-alt-2'></i>
    }
    else if(props.name === 'down'){
        return <i className='bx bx-caret-down' ></i> 
    }
    else if(props.name === 'devices'){
        return <i className='bx bx-devices' ></i>
    }
    else if(props.name === 'user'){
        return <i className='bx bxs-user' ></i>
    }
    else if(props.name === 'telegram'){
        return <i className='bx bxl-telegram'></i>
    }
    else if(props.name === 'discord'){
        return <i className='bx bxl-discord-alt' ></i>
    }
    else if(props.name === 'x'){
        return <i className='bx bx-x'></i>
    }
    else if(props.name === 'facebook'){
        return <i className='bx bxl-facebook' ></i>
    }
    else if(props.name === 'tiktok'){
        return <i className='bx bxl-tiktok' ></i>
    }
    else if(props.name === 'youtube'){
        return <i className='bx bxl-youtube' ></i>
    }
    else if(props.name === '500px'){
        return <i className='bx bxl-500px'></i>
    }
    else if(props.name === 'instagram'){
        return <i className='bx bxl-instagram'></i>
    }
    else if(props.name === 'right'){
        return <i className='bx bx-caret-right'></i>
    }
    else if(props.name === 'small left'){
        return <i className='bx bx-chevron-left'></i>
    }
    else if(props.name === 'heart'){
        return <i className='bx bxs-heart' ></i>
    }
    else if(props.name === 'error'){
        return <i className='bx bxs-error-circle' ></i>
    }
    else if(props.name === 'small right'){
        return <i className='bx bx-chevron-right' ></i>
    }
    else if(props.name === 'filter'){
        return <i className='bx bxs-filter-alt'></i>
    }
    else if(props.name === 'big right'){
        return <i className='bx bx-right-arrow-alt' ></i>
    }
    else if(props.name === 'left'){
        return <i className='bx bx-left-arrow-alt'></i>
    }
    else if(props.name === 'x'){
        return <i className='bx bx-x'></i>
    }
    else if(props.name === 'menu'){
        return <i className='bx bx-menu'></i>
    }
    else if(props.name === '+'){
        return <i className='bx bx-plus'></i>
    }
    else if(props.name === 'cmt'){
        return <i className='bx bx-message-dots'></i>
    }
    else if(props.name === 'desktop'){
        return <i className='bx bx-desktop'></i>
    }
    else if(props.name === 'mobile'){
        return <i className='bx bx-mobile-alt'></i>
    }
}
export default Icon