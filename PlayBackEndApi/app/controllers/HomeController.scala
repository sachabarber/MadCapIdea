package controllers


import javax.inject.Inject
import play.api.mvc.{Action, Controller}

class HomeController @Inject() (environment: play.api.Environment)
  extends Controller {

  def index() = Action {
    val fullpath = s"${environment.rootPath}\\public\\dist\\index.html"
    val htmlContents = scala.io.Source.fromFile(fullpath).mkString
    Ok(htmlContents).as("text/html")
  }

}
