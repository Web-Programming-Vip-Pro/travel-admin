import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import Index from './pages'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <DefaultLayout>
          <Route path="/">
            <Index />
          </Route>
        </DefaultLayout>
      </Switch>
    </Router>
  )
}

export default Routes
