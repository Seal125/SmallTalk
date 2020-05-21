import React, { useState, useEffect } from 'react'
import { Sidebar, Button, Nav } from 'grommet'

function UpcomingEvents () {
  const [upcomingEvents, setUpComingEvents] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState(null)

  useEffect(() => {
    function getRSVPEvents () {
      setIsLoading(true)
      fetch('/rsvp/user')
        .then(res => res.json())
        .then(event => {
          const newEvents = [...event]
          setUpComingEvents(newEvents)
        })
        .catch(err => {
          console.log(err)
          err = 'Sorry there was an error, please try again'
          setErr(err)
        })
    }

    getRSVPEvents()
    setIsLoading(false)
  }, [])

  console.log(upcomingEvents)

  return (
    <>
      {isLoading ? (
        <p> {err || '...Loading'}</p>
      ) : (
        // <Card className='text-center eventTable'>
        //   <Card.Header className='eventHeader'>Upcoming Events</Card.Header>
        //   {upcomingEvents &&
        //     upcomingEvents.map(event => {
        //       return (
        //         <Card.Body className='eventBody'>
        //           <Card.Title>{event.title}</Card.Title>
        //           <Button>Chat!</Button>
        //         </Card.Body>
        //       )
        //     })}
        // </Card>
        <Sidebar
          className='sideBar'
          background='brand'
          round='small'
          header='Upcoming Events'
        >
          <Nav gap='small'>
            <Button label='hello' hoverIndicator />
            <Button label='there' hoverIndicator />
          </Nav>
        </Sidebar>
      )}
    </>
  )
}

export default UpcomingEvents
