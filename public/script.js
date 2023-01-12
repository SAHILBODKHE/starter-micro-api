if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (postion) {
      const { latitude } = postion.coords
      const { longitude } = postion.coords
    },

    function () {
      alert('Could not get your location')
    },
  )
