import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import Index from './pages'

const Routes = () => {
  return (
    <Router>
      <DefaultLayout>
        <Switch>
          <Route path="/">
            <Index />
          </Route>
        </Switch>
      </DefaultLayout>
    </Router>
  )
}

export default Routes
