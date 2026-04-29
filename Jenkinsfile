pipeline {
  agent any

  tools {
    nodejs 'NodeJS-18'
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/IngenieroJosser/mentalmente_frontend.git'
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }
  }
}