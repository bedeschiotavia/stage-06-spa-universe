export class Router {
  routes = {}

  add (routeName, page) {
    this.routes[routeName] = page
  }

  route(event){
    event = event || window.event
    event.preventDefault()
  
    window.history.pushState({},"", event.target.href)
  
    this.handle()
    
  }

  handle(currentPath){
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })

    this.changeBackground(route)

    const navLinks = document.querySelectorAll("nav a")
    navLinks.forEach((link) => {
      link.classList.remove("active")
    })

    const currentLink = document.querySelector(`nav a[href='${pathname}']`)
    if (currentLink) {
      currentLink.classList.add("active")
    }
  }

  changeBackground(route) {
    const page = route.split("pages/")[1].split(".html")[0]
  
    switch(page) {
      case "home":
        document.body.style.backgroundImage = "url('./assets/img/mountains-universe-1.png')"
        break
      case "universe":
        document.body.style.backgroundImage = "url('./assets/img/mountains-universe-2.png')"
        break
      case "exploring":
        document.body.style.backgroundImage = "url('./assets/img/mountains-universe-3.png')"
        break
      default:
        document.body.style.backgroundImage = "url('./assets/img/mountains-universe-1.png')"
    }
  }
}

